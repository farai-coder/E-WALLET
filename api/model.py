import datetime
import enum
import bcrypt
from sqlalchemy import (
    Float, Integer, Column, BigInteger, String, Text, Enum, Numeric, DateTime, ForeignKey,event,text
)
from sqlalchemy.orm import relationship
from api.data import Base, engine


# Hash password
def hash_password(password: str) -> str:
    """Hashes a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)
    return hashed_password.decode()
# -------------------------
# Enums for Statuses and Types
# -------------------------
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

# -------------------------
# Database Models
# -------------------------
class User(Base):
    __tablename__ = "users"
    reg_number = Column(String, primary_key=True)
    name = Column(String(50), nullable=False)
    surname = Column(String(50), nullable=False)
    email = Column(String(50), unique=True, index=True, nullable=False)
    phone_number = Column(String(20), unique=True, index=True)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)

    # Relationships
    wallet = relationship("Wallet", back_populates="user", uselist=False)
 
    def __init__(self,reg_number,name,surname,email,phone_number,password_hash):
        self.reg_number = reg_number
        self.name = name
        self.surname = surname
        self.email = email
        self.phone_number = phone_number
        self.password_hash = password_hash
        
    def __repr__(self):
        return f"name : {self.name}, surname: {self.surname}, reg_number: {self.reg_number}, {self.email}, {self.phone_number}"   

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    username = Column(String(50),nullable=False)
    password_hash = Column(Text,nullable=False)
    
    def __repr__(self):
        return f"id: {self.id} , username: {self.username}"
        
#main wallet table
class Main_Wallet(Base):
    __tablename__ = "main_wallet"
    id = Column(Integer, primary_key=True, index=True)
    total_balance = Column(Float, default=0)
        
class Wallet(Base):
    __tablename__ = "wallets"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    student_reg_number = Column(String, ForeignKey("users.reg_number"), nullable=True)
    service_provider_id = Column(BigInteger, ForeignKey("service_providers.account_number"), nullable=True)
    balance = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.datetime.now)

    # Relationships
    user = relationship("User", back_populates="wallet")
    service_provider = relationship("ServiceProvider", back_populates="wallet")

class Transaction(Base):
    __tablename__ = "transactions"
    transaction_id = Column(String, primary_key=True, index=True,unique=True)
    wallet_id_from = Column(BigInteger, ForeignKey("wallets.id"), nullable=True)
    wallet_id_to = Column(BigInteger, ForeignKey("wallets.id"), nullable=True)
    amount = Column(Numeric(20, 2), nullable=False)
    transaction_type = Column(Enum(TransactionType), nullable=False)
    status = Column(Enum(TransactionStatus), nullable=False)
    reference = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)

    
class ServiceProvider(Base):
    __tablename__ = "service_providers"
    account_number = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    contact = Column(String(255)) #phone number
    location = Column(String(255))
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)

    # Relationships
    wallet = relationship("Wallet", back_populates="service_provider", uselist=False)
    service = relationship("Service", back_populates="provider", cascade="all, delete")


class Service(Base):
    #table containing all the services provided by a service provider
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    service_provider_acc = Column(String, ForeignKey("service_providers.account_number"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    
    # Relationships
    provider = relationship("ServiceProvider", back_populates="service", uselist=False)

def insert_initial_records(engine, connection, **kwargs):
    """
    Inserts an initial record into the 'main_wallet' table when the database is created.
    """
    result = connection.execute(text("SELECT COUNT(*) FROM main_wallet")).fetchone()
    if result[0] == 0:  # Check if table is empty
        connection.execute(Main_Wallet.__table__.insert().values(id = 2121,total_balance=0.0))
        
    result = connection.execute(text("SELECT COUNT(*) FROM admins")).fetchone()
    if result[0] == 0:  # Check if table is empty
        connection.execute(Admin.__table__.insert().values(id = 1,username="admin",password_hash=hash_password("admin")))

# Attach event listener to insert the initial record
event.listen(Base.metadata, "after_create", insert_initial_records)

Base.metadata.create_all(bind=engine)
