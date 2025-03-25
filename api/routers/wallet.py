from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.help_fun import get_db
from api.schemas import *
from api.model import *
from api.data import *

router = APIRouter()

#get a single user(wallet)wallet
@router.get("/user")
def get_user_wallet(reg_number:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == reg_number.lower()).first()
    if not user:
        raise HTTPException(status_code=404, detail="wallet not found")
    wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="wallet not found")
    return wallet

#get a single wallet
@router.get("/service_provider")
def get_service_provider_wallet(account_number:str, db: Session = Depends(get_db)):
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == account_number.upper()).first()
    if not service_provider:
        raise HTTPException(status_code=404, detail="wallet not found")
    wallet = db.query(Wallet).filter(Wallet.service_provider_id == service_provider.account_number).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="wallet not found")
    return wallet

#get the main wallet
@router.get("/main")
def get_main_wallet( db: Session = Depends(get_db)):
    wallet = db.query(Main_Wallet).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="wallet not found")
    return wallet
