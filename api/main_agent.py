from __future__ import annotations

from fastapi import APIRouter

from models.main_agent import OrchestrateRequest, OrchestrateResponse
from services.main_agent import orchestrate

router = APIRouter(prefix="/main", tags=["main"])


@router.post("/orchestrate", response_model=OrchestrateResponse)
def post_orchestrate(req: OrchestrateRequest) -> OrchestrateResponse:
	return orchestrate(req)