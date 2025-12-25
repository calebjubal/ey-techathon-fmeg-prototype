from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

# Temporary in-memory store
users = []

@router.get("/")
def get_users():
    return users

@router.post("/")
def create_user(user: dict):
    users.append(user)
    return {"message": "User created", "user": user}

@router.patch("/{user_id}")
def update_user(user_id: int, user: dict):
    if user_id >= len(users):
        return {"error": "User not found"}
    users[user_id] = user
    return {"message": "User updated", "user": user}
