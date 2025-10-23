from __future__ import annotations

from typing import Optional

from models.main_agent import (
	OrchestrateRequest,
	OrchestrateResponse,
	PricingRequest,
	SalesIdentifyRequest,
	TechnicalRecommendRequest,
)
from services.pricing_agent import price_recommendations
from services.sales_agent import identify_rfps
from services.technical_agent import recommend_oem_products


def orchestrate(req: OrchestrateRequest) -> OrchestrateResponse:
	# 1) Identify/select an RFP
	sales_res = identify_rfps(
		SalesIdentifyRequest(sources=req.sources, due_within_days=req.due_within_days)
	)
	rfp = None
	if sales_res.rfps:
		chosen_id = sales_res.selected_rfp_id or sales_res.rfps[0].id
		rfp = next((r for r in sales_res.rfps if r.id == chosen_id), sales_res.rfps[0])

	# 2) Technical recommendations
	technical = None
	if rfp and req.scope:
		technical = recommend_oem_products(TechnicalRecommendRequest(rfp=rfp, scope=req.scope))

	# 3) Pricing
	pricing = None
	if technical:
		pricing = price_recommendations(
			PricingRequest(recommendations=technical.recommendations, tests=req.tests)
		)

	return OrchestrateResponse(rfp=rfp, technical=technical, pricing=pricing)

