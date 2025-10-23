from __future__ import annotations

from fastapi import APIRouter

from models.technical_agent import (
	TechnicalRecommendRequest,
	TechnicalRecommendResponse,
)
from services.technical_agent import recommend_oem_products

router = APIRouter(prefix="/technical", tags=["technical"])


@router.post("/recommend", response_model=TechnicalRecommendResponse)
def post_recommend(req: TechnicalRecommendRequest) -> TechnicalRecommendResponse:
	return recommend_oem_products(req)

