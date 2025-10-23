from __future__ import annotations

from datetime import date
from typing import List, Optional

from pydantic import BaseModel, Field


class Spec(BaseModel):
	name: str = Field(..., description="Specification name")
	value: str = Field(..., description="Specification value as text")


class ScopeItem(BaseModel):
	item_id: str = Field(..., description="Client-provided identifier for the scope item")
	description: str = Field(..., description="Human-readable description of the item")
	specs: List[Spec] = Field(default_factory=list, description="List of required specifications")


class RFPRecord(BaseModel):
	id: str
	title: str
	url: Optional[str] = None
	due_date: Optional[date] = None
	summary: Optional[str] = None


class CandidateProduct(BaseModel):
	sku: str
	oem: Optional[str] = None
	match_score: float = Field(ge=0.0, le=1.0, description="0-1 score representing spec match strength")
	notes: Optional[str] = None


class Recommendation(BaseModel):
	scope_item_id: str
	candidates: List[CandidateProduct]


class SalesIdentifyRequest(BaseModel):
	sources: List[str] = Field(
		default_factory=list,
		description="List of URLs or references to candidate RFPs to analyze",
	)
	due_within_days: int = Field(3, ge=0, description="Filter for RFPs due within N days")


class SalesIdentifyResponse(BaseModel):
	rfps: List[RFPRecord]
	selected_rfp_id: Optional[str] = None


class TechnicalRecommendRequest(BaseModel):
	rfp: RFPRecord
	scope: List[ScopeItem]


class TechnicalRecommendResponse(BaseModel):
	recommendations: List[Recommendation]


class PricingRequest(BaseModel):
	recommendations: List[Recommendation]
	tests: List[str] = Field(default_factory=list, description="Optional list of tests/services to price")


class PricedItem(BaseModel):
	scope_item_id: str
	sku: str
	unit_price: float
	quantity: int = 1
	service_price: float = 0.0
	total_price: float


class PricingResponse(BaseModel):
	currency: str = "USD"
	items: List[PricedItem]
	subtotal: float
	services_total: float
	grand_total: float


class OrchestrateRequest(BaseModel):
	sources: List[str] = Field(default_factory=list)
	due_within_days: int = 3
	scope: List[ScopeItem] = Field(default_factory=list)
	tests: List[str] = Field(default_factory=list)


class OrchestrateResponse(BaseModel):
	rfp: Optional[RFPRecord] = None
	technical: Optional[TechnicalRecommendResponse] = None
	pricing: Optional[PricingResponse] = None

