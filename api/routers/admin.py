from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.data import *

router = APIRouter()
# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/approve_user/{user_id}")
def approve_user(user_id: int,  db: Session = Depends(get_db)):
    # Logic to approve a user
    return {"message": f"User {user_id} approved"}

@router.post("/block_user/{user_id}")
def block_user(user_id: int,  db: Session = Depends(get_db)):
    # Logic to block a user
    return {"message": f"User {user_id} blocked"}
