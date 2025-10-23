from __future__ import annotations

import json
from datetime import date, timedelta
from typing import List

from models.main_agent import RFPRecord, SalesIdentifyRequest, SalesIdentifyResponse


def _try_import_ollama():
	try:
		import ollama  # type: ignore

		return ollama
	except Exception:
		return None


def _extract_first_json(text: str) -> str | None:
	"""Extract the first top-level JSON object or array from text."""
	start = None
	depth = 0
	in_string = False
	escape = False
	for i, ch in enumerate(text):
		if ch in "[{" and start is None:
			start = i
			depth = 1
			in_string = False
			escape = False
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


def identify_rfps(req: SalesIdentifyRequest) -> SalesIdentifyResponse:
	"""Identify and select an RFP using Ollama; fallback to a simple heuristic if unavailable."""
	ollama = _try_import_ollama()

	if ollama:
		model = "llama3.1"  # Adjust to your local model name if different
		system = (
			"You are a helpful assistant that extracts RFP details from links or references "
			"and returns strict JSON. Always include a succinct summary if possible."
		)
		user = (
			"Analyze these candidate RFP sources and list those due within {n} days. "
			"Output JSON with: rfps: [{{id,title,url,due_date,summary}}], selected_rfp_id."\
		).format(n=req.due_within_days)
		if req.sources:
			user += "\nSources:" + "\n".join(f"- {u}" for u in req.sources)
		else:
			user += "\n(Sources not provided. Create a realistic placeholder RFP.)"

		prompt = (
			system
			+ "\n\nUser:\n"
			+ user
			+ "\n\nReturn only JSON. Example format:\n"
			+ json.dumps(
				{
					"rfps": [
						{
							"id": "rfp-001",
							"title": "Supply of Control Panels",
							"url": "https://example.com/rfp-001",
							"due_date": str(date.today() + timedelta(days=2)),
							"summary": "RFP for medium voltage control panels with testing",
						}
					],
					"selected_rfp_id": "rfp-001",
				}
			)
		)

		try:
			res = ollama.generate(model=model, prompt=prompt)
			content = res.get("response") if isinstance(res, dict) else res  # type: ignore
			if not isinstance(content, str):
				content = json.dumps(content)
			json_str = _extract_first_json(content) or content
			data = json.loads(json_str)
			rfps: List[RFPRecord] = []
			for r in data.get("rfps", []):
				# Pydantic will coerce date string to date
				rfps.append(RFPRecord(**r))
			return SalesIdentifyResponse(
				rfps=rfps, selected_rfp_id=data.get("selected_rfp_id")
			)
		except Exception:
			# Fall through to deterministic fallback
			pass

	# Fallback: fabricate a single RFP from the first source (or a placeholder)
	url = req.sources[0] if req.sources else "https://example.com/placeholder-rfp"
	rfps = [
		RFPRecord(
			id="rfp-placeholder",
			title="Placeholder RFP",
			url=url,
			due_date=date.today() + timedelta(days=max(req.due_within_days - 1, 1)),
			summary="Auto-generated placeholder RFP when Ollama is unavailable.",
		)
	]
	return SalesIdentifyResponse(rfps=rfps, selected_rfp_id=rfps[0].id)

