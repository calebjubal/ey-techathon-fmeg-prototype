from __future__ import annotations

from fastapi import APIRouter

from models.pricing_agent import PricingRequest, PricingResponse
from services.pricing_agent import price_recommendations

router = APIRouter(prefix="/pricing", tags=["pricing"])


@router.post("/price", response_model=PricingResponse)
def post_price(req: PricingRequest) -> PricingResponse:
	return price_recommendations(req)

