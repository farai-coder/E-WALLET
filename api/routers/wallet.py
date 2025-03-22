from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.help_fun import get_db
from api.schemas import *
from api.model import *
from api.data import *

router = APIRouter()

#get a single wallet
@router.get("/wallet")
def get_wallet(wallet_id, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.id == wallet_id).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="wallet not found")
    return wallet

