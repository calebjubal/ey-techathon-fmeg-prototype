from typing import Dict, Any

from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder

from schemas.user_schema import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])

# Simple in-memory store for demo purposes only.
mem_db: Dict[str, Dict[str, Any]] = {}


@router.get("/", response_model=list[UserResponse])
async def list_users() -> list[UserResponse]:
    return [
        UserResponse(username=data["username"], email=data.get("email"))
        for data in mem_db.values()
    ]


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate) -> UserResponse:
    if user.username in mem_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    user_record = jsonable_encoder(user)
    mem_db[user.username] = user_record
    return UserResponse(username=user_record["username"], email=user_record.get("email"))


@router.get("/{username}", response_model=UserResponse)
async def get_user(username: str) -> UserResponse:
    stored_user = mem_db.get(username)
    if not stored_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse(username=stored_user["username"], email=stored_user.get("email"))


@router.delete("/{username}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(username: str) -> None:
    if username not in mem_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    del mem_db[username]