# from typing import Union

# from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RFP Response Agent Orchestrator")

# Routers
from api.main_agent import router as main_router
from api.sales_agent import router as sales_router
from api.technical_agent import router as technical_router
from api.pricing_agent import router as pricing_router

# class Fruit(BaseModel):
#     fruit: str

# class Fruits(BaseModel):
#     fruits: list[Fruit] # list[obj]

@app.get("/")
def root():
    return {"message": "Welcome to RFP Response Agent Orchestrator API"}

# db = {"fruits": []}

# @app.get("/fruits", response_model=Fruits)
# def get_fruits():
#     return Fruits(fruits=db["fruits"])

# @app.post("/fruits")
# def add_fruit(fruit: Fruit): #JSON body conv
#     db["fruits"].append(fruit)
#     return {"message": "Fruit added successfully"}
    

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(main_router)
app.include_router(sales_router)
app.include_router(technical_router)
app.include_router(pricing_router)