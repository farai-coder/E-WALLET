from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.data import *
from api.schemas import *
from api.model import *

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Wallet)
def create_wallet(wallet: Wallet, db: Session = Depends(get_db)):
    db_wallet = WalletModel(**wallet.dict())
    db.add(db_wallet)
    db.commit()
    db.refresh(db_wallet)
    return db_wallet

@router.get("/{wallet_id}", response_model=Wallet)
def get_wallet(wallet_id: int, db: Session = Depends(get_db)):
    return db.query(WalletModel).filter(WalletModel.id == wallet_id).first()

@router.post("/{wallet_id}/add")
def add_funds(wallet_id: int, amount: float, db: Session = Depends(get_db)):
    wallet = db.query(WalletModel).filter(WalletModel.id == wallet_id).first()
    if wallet:
        wallet.balance += amount
        db.commit()
        return {"message": "Funds added successfully", "new_balance": wallet.balance}
    return {"message": "Wallet not found"}, 404

@router.post("/{wallet_id}/withdraw")
def withdraw_funds(wallet_id: int, amount: float, db: Session = Depends(get_db)):
    wallet = db.query(WalletModel).filter(WalletModel.id == wallet_id).first()
    if wallet and wallet.balance >= amount:
        wallet.balance -= amount
        db.commit()
        return {"message": "Withdrawal successful", "new_balance": wallet.balance}
    return {"message": "Insufficient balance or wallet not found"}, 404
