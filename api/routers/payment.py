import random
import string
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.data import *
from api.help_fun import get_db
from api.model import *
from api.schemas import DepositRequest, DepositResponse, PaymentRequest, PaymentResponse, WithdrawRequest, WithdrawResponse
from api.help_fun import generate_transaction_id
from api.notification_service import NotificationService

router = APIRouter()


#make a payment from one user to another
@router.post("/user_to_user", response_model=PaymentResponse)
def make_payment(request: PaymentRequest, db: Session = Depends(get_db)):
    # both sender and receiver accounts for this api are the students reg numbers
    # Payment endpoint
    sender = db.query(User).filter(User.reg_number == request.sender_account).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    sender_wallet = db.query(Wallet).filter(Wallet.student_reg_number == sender.reg_number).first()
    if not sender_wallet:
        raise HTTPException(status_code=404, detail="Sender wallet not found")
    
    receiver = db.query(User).filter(User.reg_number == request.receiver_account).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    receiver_wallet = db.query(Wallet).filter(Wallet.student_reg_number == receiver.reg_number).first()
    if not receiver_wallet:
        raise HTTPException(status_code=404, detail="Receiver wallet not found")
    
    # Check if the sender has enough balance
    if sender_wallet.balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
        
    # Create a payment transaction
    reference = "PAYMENT_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id = generate_transaction_id(TransactionType.payment,db),
        wallet_id_from=sender_wallet.id,
        wallet_id_to=receiver_wallet.id,
        amount=request.amount,
        transaction_type=TransactionType.payment,
        status=TransactionStatus.completed,
        reference=reference
    )
    db.add(new_transaction)
    sender_wallet.balance -= request.amount
    receiver_wallet.balance += request.amount
    db.commit()
    
    
    
    #send email and sms
    #create body and prepare numbers for the notifications
    sender_body = f"Paymenent successful for ${request.amount} to : {receiver.reg_number}  "
    receiver_body = f"Received Paymenent for ${request.amount} from : {sender.reg_number}  "
    sender_phone_number = f"+263{sender.phone_number}"
    receiver_phone_number = f"+263{receiver.phone_number}"
    
    NotificationService.send_email(sender.email,"transaction",sender_body)
    
    #send to both sender and receiver 
    NotificationService.send_sms(sender_phone_number,sender_body)
    NotificationService.send_sms(receiver_phone_number,receiver_body)
    
    return PaymentResponse(message="Payment successful", amount=request.amount, sender_id=sender.reg_number, receiver_id=receiver.reg_number)

# make a payment from a user to a service provider
@router.post("/user_to_service_provider", response_model=PaymentResponse)
def make_payment_to_service_provider(request: PaymentRequest, db: Session = Depends(get_db)):
    # Payment endpoint
    sender = db.query(User).filter(User.reg_number == request.sender_account).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    sender_wallet = db.query(Wallet).filter(Wallet.student_reg_number == sender.reg_number).first()
    if not sender_wallet:
        raise HTTPException(status_code=404, detail="Sender wallet not found")
    
    receiver = db.query(ServiceProvider).filter(ServiceProvider.account_number == request.receiver_account).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    receiver_wallet = db.query(Wallet).filter(Wallet.service_provider_id == receiver.account_number).first()
    if not receiver_wallet:
        raise HTTPException(status_code=404, detail="Receiver wallet not found")
    
    # Check if the sender has enough balance
    if sender_wallet.balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
        
    # Create a payment transaction
    reference = "PAYMENT_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id = generate_transaction_id(TransactionType.payment,db),
        wallet_id_from=sender_wallet.id,
        wallet_id_to=receiver_wallet.id,
        amount=request.amount,
        transaction_type=TransactionType.payment,
        status=TransactionStatus.completed,
        reference=reference
    )
    db.add(new_transaction)
    sender_wallet.balance -= request.amount
    receiver_wallet.balance += request.amount
    db.commit()
    
    #create body and prepare numbers for the notifications
    sender_body = f"Paymenent successful for ${request.amount} to : {receiver.name}  "
    receiver_body = f"Received Paymenent for ${request.amount} from : {sender.reg_number}  "
    sender_phone_number = f"+263{sender.phone_number}"
    receiver_phone_number = f"+263{receiver.contact}"
    
    NotificationService.send_email(sender.email,"transaction",sender_body)
    
    #send to both sender and receiver 
    NotificationService.send_sms(sender_phone_number,sender_body)
    NotificationService.send_sms(receiver_phone_number,receiver_body)
    
    
    return PaymentResponse(message="Payment successful", amount=request.amount, sender_id=sender.reg_number, receiver_id=receiver.account_number)

# make a payment from a service provider to a service provider
@router.post("/service_provider_to_service_provider", response_model=PaymentResponse)
def make_payment_to_service_provider(request: PaymentRequest, db: Session = Depends(get_db)):
    # Payment endpoint
    sender = db.query(ServiceProvider).filter(ServiceProvider.account_number == request.sender_account).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    sender_wallet = db.query(Wallet).filter(Wallet.service_provider_id == sender.account_number).first()
    if not sender_wallet:
        raise HTTPException(status_code=404, detail="Sender wallet not found")
    
    receiver = db.query(ServiceProvider).filter(ServiceProvider.account_number == request.receiver_account).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    receiver_wallet = db.query(Wallet).filter(Wallet.service_provider_id == receiver.account_number).first()
    if not receiver_wallet:
        raise HTTPException(status_code=404, detail="Receiver wallet not found")
    
    # Check if the sender has enough balance
    if sender_wallet.balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
        
    # Create a payment transaction
    reference = "PAYMENT_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id = generate_transaction_id(TransactionType.payment,db),
        wallet_id_from=sender_wallet.id,
        wallet_id_to=receiver_wallet.id,
        amount=request.amount,
        transaction_type=TransactionType.payment,
        status=TransactionStatus.completed,
        reference=reference
    )
    db.add(new_transaction)
    sender_wallet.balance -= request.amount
    receiver_wallet.balance += request.amount
    db.commit()
    
    #create body and prepare numbers for the notifications
    sender_body = f"Paymenent successful for ${request.amount} to : {receiver.name}  "
    receiver_body = f"Received Paymenent for ${request.amount} from : {sender.name}  "
    sender_phone_number = f"+263{sender.contact}"
    receiver_phone_number = f"+263{receiver.contact}"
    
    
    
    #send to both sender and receiver 
    NotificationService.send_sms(sender_phone_number,sender_body)
    
    NotificationService.send_sms(receiver_phone_number,receiver_body)
    return PaymentResponse(message="Payment successful", amount=request.amount, sender_id=sender.account_number, receiver_id=receiver.account_number)


# deposit money into the user(student) wallet
@router.post("/deposit_to_wallet", response_model=DepositResponse)
def make_deposit(request : DepositRequest , db: Session = Depends(get_db)):
    #check if the user and wallet exist
    user = db.query(User).filter(User.reg_number == request.reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not user_wallet:
        raise HTTPException(status_code=404, detail="User wallet not found")
    
    # Create a deposit transaction
    reference = "Deposit_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id = generate_transaction_id(TransactionType.deposit,db),
        wallet_id_to=user_wallet.id,
        amount=request.amount,
        transaction_type=TransactionType.deposit,
        status=TransactionStatus.completed,
        reference=reference
    )
    db.add(new_transaction)
    user_wallet.balance += request.amount
    # add total balance to the main wallet
    main_wallet = db.query(Main_Wallet).first()
    main_wallet.total_balance += request.amount
    db.commit()
    
    #create body and prepare numbers for the notifications
    sender_body = f"Deposit successful for ${request.amount} to : {user.reg_number} current wallet balance is ${user_wallet.balance} "
    
    sender_phone_number = f"+263{user.phone_number}"
        
    NotificationService.send_email(user.email,"transaction",sender_body)
    
    #send to both sender and receiver 
    NotificationService.send_sms(sender_phone_number,sender_body)
    
    return DepositResponse(message="Deposit Successful",amount=request.amount,student_id=user.reg_number) 
    
# withdraw money from the user(student) wallet
@router.post("/withdraw_from_user_wallet",response_model=WithdrawResponse)
def make_withdrawal(request:WithdrawRequest,db:Session= Depends(get_db)):
    #check if the user and wallet exist
    user = db.query(User).filter(User.reg_number == request.reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not user_wallet:
        raise HTTPException(status_code=404, detail="User wallet not found")
    
    # check if the wallet has suffient balance
  
    if user_wallet.balance < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    # Create a deposit transaction
    reference = "Withdraw_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id = generate_transaction_id(TransactionType.withdrawal,db),
        wallet_id_from=user_wallet.id,
        amount=request.amount,
        transaction_type=TransactionType.withdrawal,
        status=TransactionStatus.completed,
        reference_=reference
    )
    db.add(new_transaction)
    user_wallet.balance -= request.amount
    #subtract total balance to the main wallet
    main_wallet = db.query(Main_Wallet).first()
    main_wallet.total_balance -= request.amount
    db.commit()
    
    #create body and prepare numbers for the notifications
    sender_body = f"Withdrawal successful for ${request.amount} from : {user.reg_number} current wallet balance is ${user_wallet.balance} "
    
    sender_phone_number = f"+263{user.phone_number}"
    
    
    NotificationService.send_email(user.email,"transaction",sender_body)
    
    #send to both sender and receiver 
    NotificationService.send_sms(sender_phone_number,sender_body)
    
    
    return DepositResponse(message="Deposit Successful",amount=request.amount,student_id=user.reg_number) 
    