from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from api.schemas import *
from api.model import *
from api.data import *

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = UserModel(name=user.name, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/{user_id}/offer_service/", response_model=Service)
def offer_service(user_id: int, service: Service, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_service = ServiceModel(name=service.name, description=service.description)
    db.add(db_service)
    
    user.services_offered.append(db_service)
    
    db.commit()
    db.refresh(user)
    return db_service

@router.get("/{user_id}/services_offered", response_model=List[Service])
def get_offered_services(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user.services_offered

@router.get("/{user_id}/services_received", response_model=List[Service])
def get_received_services(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user.services_received
