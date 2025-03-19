from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.model import *
from api.schemas import *
from api.data import *

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=Transaction)
def create_transaction(transaction: Transaction, db: Session = Depends(get_db)):
    sender_wallet = db.query(WalletModel).filter(WalletModel.id == transaction.sender_wallet_id).first()
    receiver_wallet = db.query(WalletModel).filter(WalletModel.id == transaction.receiver_wallet_id).first()

    if sender_wallet and receiver_wallet and sender_wallet.balance >= transaction.amount:
        sender_wallet.balance -= transaction.amount
        receiver_wallet.balance += transaction.amount

        db_transaction = TransactionModel(**transaction.dict())
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)

        return {"message": "Transaction successful", "transaction": db_transaction}
    return {"message": "Transaction failed due to insufficient balance or invalid wallets"}, 404

@router.get("/{transaction_id}", response_model=Transaction)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    return db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
