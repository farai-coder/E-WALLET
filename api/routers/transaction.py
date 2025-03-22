from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from api.help_fun import get_db
from api.schemas import *
from api.model import *
from api.data import *
router = APIRouter()




# Get a single transaction
@router.get("/transaction/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


#get all deposits for a single user
@router.get("/deposits/{user_id}", response_model=List[TransactionResponse])
def get_deposits(reg_number:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    deposits = db.query(Transaction).filter(Transaction.wallet_id_from == wallet.id, Transaction.transaction_type == TransactionType.deposit).all()
    return deposits

#get all withdrawals for a single user
@router.get("/withdrawals/{user_id}", response_model=List[TransactionResponse])
def get_withdrawals(reg_number:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    withdrawals = db.query(Transaction).filter(Transaction.wallet_id_from == wallet.id, Transaction.transaction_type == TransactionType.withdrawal).all()
    return withdrawals

