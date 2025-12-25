from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def dashboard_home():
    return {
        "status": "ok",
        "message": "Dashboard loaded"
    }

@router.get("/summary")
def dashboard_summary():
    return {
        "rfps": 5,
        "responses_generated": 3,
        "agents_active": 4
    }
