from __future__ import annotations

import json
from typing import Dict, List
import os

from models.main_agent import (
	PricedItem,
	PricingRequest,
	PricingResponse,
	Recommendation,
)


def _try_import_ollama():
	try:
		import ollama  # type: ignore

		return ollama
	except Exception:
		return None


def _hash_price(seed: str, base: float, spread: float = 0.25) -> float:
	h = abs(hash(seed)) % 1000
	factor = 1.0 + ((h / 1000.0) - 0.5) * 2 * spread
	return round(base * factor, 2)


def _fallback_price(recommendations: List[Recommendation], tests: List[str]) -> PricingResponse:
	items: List[PricedItem] = []
	for rec in recommendations:
		if not rec.candidates:
			continue
		top = rec.candidates[0]
		unit_price = _hash_price(top.sku, 1000.0)
		service_price = sum(_hash_price(t + top.sku, 150.0, 0.15) for t in tests) if tests else 0.0
		total = round(unit_price + service_price, 2)
		items.append(
			PricedItem(
				scope_item_id=rec.scope_item_id,
				sku=top.sku,
				unit_price=unit_price,
				service_price=service_price,
				total_price=total,
			)
		)
	subtotal = round(sum(i.unit_price for i in items), 2)
	services_total = round(sum(i.service_price for i in items), 2)
	grand_total = round(sum(i.total_price for i in items), 2)
	return PricingResponse(
		currency="USD",
		items=items,
		subtotal=subtotal,
		services_total=services_total,
		grand_total=grand_total,
	)


def price_recommendations(req: PricingRequest) -> PricingResponse:
	ollama = _try_import_ollama()
	if ollama and req.recommendations:
		model = os.getenv("OLLAMA_MODEL", "llama3.1")
		system = (
			"You are a pricing assistant. Given candidate products and tests/services, "
			"estimate unit prices and service prices. This is a dummy pricing; keep values realistic. "
			"Return strict JSON only."
		)
		user_payload = {
			"recommendations": [
				{
					"scope_item_id": r.scope_item_id,
					"candidates": [c.model_dump() for c in r.candidates],
				}
				for r in req.recommendations
			],
			"tests": req.tests,
			"output_format": {
				"currency": "USD",
				"items": [
					{
						"scope_item_id": "<string>",
						"sku": "<string>",
						"unit_price": 1234.56,
						"quantity": 1,
						"service_price": 123.45,
						"total_price": 1358.01,
					}
				],
				"subtotal": 0,
				"services_total": 0,
				"grand_total": 0,
			},
		}
		prompt = (
			system
			+ "\n\nUser JSON:\n"
			+ json.dumps(user_payload)
			+ "\n\nRules: pick the best candidate per scope_item_id. total_price = unit_price * quantity + service_price. Return only JSON."
		)
		try:
			res = ollama.generate(model=model, prompt=prompt)
			content = res.get("response") if isinstance(res, dict) else res  # type: ignore
			if not isinstance(content, str):
				content = json.dumps(content)
			# best effort parse
			data = None
			try:
				data = json.loads(content)
			except Exception:
				# try to extract JSON
				start = content.find("{")
				end = content.rfind("}")
				if start != -1 and end != -1:
					data = json.loads(content[start : end + 1])
			if data:
				items = [PricedItem(**i) for i in data.get("items", [])]
				if items:
					return PricingResponse(
						currency=data.get("currency", "USD"),
						items=items,
						subtotal=float(data.get("subtotal", sum(i.unit_price for i in items))),
						services_total=float(data.get("services_total", sum(i.service_price for i in items))),
						grand_total=float(data.get("grand_total", sum(i.total_price for i in items))),
					)
		except Exception:
			pass

	return _fallback_price(req.recommendations, req.tests)

