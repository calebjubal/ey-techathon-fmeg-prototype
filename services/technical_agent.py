from __future__ import annotations

import json
from typing import List
import os

from models.main_agent import (
	CandidateProduct,
	Recommendation,
	ScopeItem,
	TechnicalRecommendRequest,
	TechnicalRecommendResponse,
)


def _try_import_ollama():
	try:
		import ollama  # type: ignore

		return ollama
	except Exception:
		return None


def _extract_first_json(text: str) -> str | None:
	start = None
	depth = 0
	in_string = False
	escape = False
	for i, ch in enumerate(text):
		if ch in "[{" and start is None:
			start = i
			depth = 1
			break
	if start is None:
		return None
	for i in range(start, len(text)):
		ch = text[i]
		if in_string:
			if ch == "\\" and not escape:
				escape = True
			elif ch == '"' and not escape:
				in_string = False
			else:
				escape = False
			continue
		if ch == '"':
			in_string = True
			continue
		if ch in "[{":
			depth += 1
		elif ch in "]}":
			depth -= 1
			if depth == 0:
				return text[start : i + 1]
	return None


def _fallback_recommend(scope: List[ScopeItem]) -> TechnicalRecommendResponse:
	recs: List[Recommendation] = []
	for item in scope:
		base_sku = (item.description or item.item_id).upper().replace(" ", "-")
		candidates = [
			CandidateProduct(sku=f"OEMX-{base_sku}-A", oem="OEMX", match_score=0.82),
			CandidateProduct(sku=f"OEMY-{base_sku}-B", oem="OEMY", match_score=0.78),
			CandidateProduct(sku=f"OEMZ-{base_sku}-C", oem="OEMZ", match_score=0.72),
		]
		recs.append(Recommendation(scope_item_id=item.item_id, candidates=candidates))
	return TechnicalRecommendResponse(recommendations=recs)


def recommend_oem_products(req: TechnicalRecommendRequest) -> TechnicalRecommendResponse:
	ollama = _try_import_ollama()
	if ollama:
		model = os.getenv("OLLAMA_MODEL", "llama3.1")
		system = (
			"You are a technical matching assistant. Given scope items and their specs, "
			"recommend the top 3 OEM products per item with a 0-1 match_score. "
			"Return strict JSON only."
		)
		user_payload = {
			"rfp": req.rfp.model_dump(),
			"scope": [s.model_dump() for s in req.scope],
			"output_format": {
				"recommendations": [
					{
						"scope_item_id": "<string>",
						"candidates": [
							{
								"sku": "<string>",
								"oem": "<string>",
								"match_score": 0.85,
								"notes": "<optional string>",
							}
						],
					}
				]
			},
		}
		prompt = (
			system
			+ "\n\nUser JSON:\n"
			+ json.dumps(user_payload)
			+ "\n\nReturn only the JSON matching the output_format."
		)
		try:
			res = ollama.generate(model=model, prompt=prompt)
			content = res.get("response") if isinstance(res, dict) else res  # type: ignore
			if not isinstance(content, str):
				content = json.dumps(content)
			json_str = _extract_first_json(content) or content
			data = json.loads(json_str)
			recs: List[Recommendation] = []
			for r in data.get("recommendations", []):
				candidates = [CandidateProduct(**c) for c in r.get("candidates", [])]
				recs.append(Recommendation(scope_item_id=r.get("scope_item_id", ""), candidates=candidates))
			if recs:
				return TechnicalRecommendResponse(recommendations=recs)
		except Exception:
			pass

	# Fallback if ollama not available or parsing failed
	return _fallback_recommend(req.scope)

