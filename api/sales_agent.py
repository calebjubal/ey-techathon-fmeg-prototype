from __future__ import annotations

from fastapi import APIRouter

from models.sales_agent import SalesIdentifyRequest, SalesIdentifyResponse
from services.sales_agent import identify_rfps

router = APIRouter(prefix="/sales", tags=["sales"])


@router.post("/identify", response_model=SalesIdentifyResponse)
def post_identify_rfps(req: SalesIdentifyRequest) -> SalesIdentifyResponse:
	return identify_rfps(req)

