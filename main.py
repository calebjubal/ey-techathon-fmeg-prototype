from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from api.main_agent import router as main_router
from api.sales_agent import router as sales_router
from api.technical_agent import router as technical_router
from api.pricing_agent import router as pricing_router
from api.user_routes import router as user_router
from api.dashboard_routes import router as dashboard_router

# Middleware
from api.middleware import request_logger

app = FastAPI(title="RFP Response Agent Orchestrator")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware
app.middleware("http")(request_logger)

@app.get("/")
def root():
    return {"message": "Welcome to RFP Response Agent Orchestrator API"}

# Include routers
app.include_router(main_router)
app.include_router(sales_router)
app.include_router(technical_router)
app.include_router(pricing_router)
app.include_router(user_router)
app.include_router(dashboard_router)
