import datetime
import enum
from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserRole(enum.Enum):
    student = "student"
    admin = "admin"

class TransactionType(enum.Enum):
    deposit = "deposit"
    withdrawal = "withdrawal"
    payment = "payment"

class TransactionStatus(enum.Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"
class Service(BaseModel):
    id: int
    name: str
    description: str

class UserLogin(BaseModel):
    username: str
    password: str
    
class Wallet(BaseModel):
    id: int
    user_id: int
    balance: float

class AdminCreate(BaseModel):
    username: str
    password: str
    admin_id: int
    admin_password: str

class AdminEdit(BaseModel):
    admin_id : int
    admin_password: str
    new_pass_word :str
    username:str

class Transaction(BaseModel):
    id: int
    sender_wallet_id: int
    receiver_wallet_id: int
    amount: float
    description: str

class Admin(BaseModel):
    id: int
    name: str
    privilege: str

class DepositRequest(BaseModel):
    student_id: int
    amount: float
    admin_id: int  # Only admins are allowed to deposit funds

class DepositResponse(BaseModel):
    message: str
    amount: float
    student_id: int
class UserCreate(BaseModel):
    name: str
    surname: str
    reg_number : str
    email: EmailStr
    phone_number: str
    
class ServiceProviderCreate(BaseModel):
    admin_id: int
    admin_password: str   
    name: str
    description: str
    contact: str
    location: str
    password: str  # In a real app, use proper password hashing
    
class ServiceCreate(BaseModel):
    service_provider_acc :str
    name :str
    description :str
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone_number: str
    role: UserRole
    created_at: datetime.datetime

    class Config:
        orm_mode = True

class WalletResponse(BaseModel):
    id: int
    user_id: int
    balance: float
    currency: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True

class DepositRequest(BaseModel):
    reg_number: str
    amount: float
    admin_id: int  # Only admins are allowed to deposit funds

class DepositResponse(BaseModel):
    message: str
    amount: float
    student_id: int

class WithdrawalRequest(BaseModel):
    student_id: int
    amount: float

class TransferRequest(BaseModel):
    from_student_reg_number: str
    to_student_reg_number: str
    amount: float

class ChangePasswordRequest(BaseModel):
    reg_number: str
    current_password: str
    new_password: str
class TransactionResponse(BaseModel):
    id: int
    wallet_id: int
    amount: float
    transaction_type: TransactionType
    status: TransactionStatus
    reference: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class WithdrawRequest(BaseModel):
    reg_number:str
    amount: float

class WithdrawResponse(BaseModel):
    message: str
    amount: float
    reg_number: int

class TransferResponse(BaseModel):
    message: str
    amount: float
    from_student_reg_number: int
    to_student_reg_number: int

    class Config:
        orm_mode = True

class PaymentRequest(BaseModel):
    sender_account : str
    receiver_account : str
    amount: float
    
class PaymentResponse(BaseModel):
    message : str
    amount : float
    sender_account : str
    receiver_account : str
    