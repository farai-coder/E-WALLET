from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from typing import List
from api.help_fun import get_db
from api.schemas import *
from api.model import *
from api.data import *
router = APIRouter()


# Get a single transaction
@router.get("/transaction/{transaction_id}")
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


#get all deposits for a single user
@router.get("/deposits/{user_id}")
def get_deposits(account:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == account.lower()).first()
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == account.upper()).first()
    if user:
        wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    elif service_provider:
        wallet = db.query(Wallet).filter(Wallet.service_provider_id ==  service_provider.account_number).first()       
    else:    
        raise HTTPException(status_code=404, detail="Account not found")
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    deposits = db.query(Transaction).filter(Transaction.wallet_id_to == wallet.id, Transaction.transaction_type == TransactionType.deposit).all()
    
    return deposits

#get all withdrawals for a single user or service provider
@router.get("/withdrawals/{user_id}")
def get_withdrawals(account:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == account.lower()).first()
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == account.upper()).first()
    if user:
        wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    elif service_provider:
        wallet = db.query(Wallet).filter(Wallet.service_provider_id ==  service_provider.account_number).first()       
    else:    
        raise HTTPException(status_code=404, detail="Account not found")
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    withdrawals = db.query(Transaction).filter(Transaction.wallet_id_from == wallet.id, Transaction.transaction_type == TransactionType.withdrawal).all()
    return withdrawals

#get all transactions for a single user
@router.get("/transactions/{user_id}")
def get_transactions(account:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == account.lower()).first()
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == account.upper()).first()
    if user:
        wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    elif service_provider:
        wallet = db.query(Wallet).filter(Wallet.service_provider_id ==  service_provider.account_number).first()       
    else:    
        raise HTTPException(status_code=404, detail="Account not found")
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    transactions = db.query(Transaction).filter(
        or_(Transaction.wallet_id_to == wallet.id, Transaction.wallet_id_from == wallet.id)
        ).all()
    return transactions