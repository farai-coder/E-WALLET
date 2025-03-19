from sqlalchemy import create_engine, Column, Integer, Float, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

class ServiceModel(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

class UserModel(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String)
    wallet_ids = relationship("WalletModel", back_populates="owner")
    services_offered = relationship("ServiceModel", backref="offered_by", lazy="dynamic")
    services_received = relationship("ServiceModel", backref="received_by", lazy="dynamic")

class WalletModel(Base):
    __tablename__ = "wallets"
    
    id = Column(Integer, primary_key=True, index=True)
    #user_id = Column(Integer, ForeignKey('users.id'))
    balance = Column(Float, default=0.0)
    owner = relationship("UserModel", back_populates="wallet_ids")

class TransactionModel(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    sender_wallet_id = Column(Integer, ForeignKey('wallets.id'))
    receiver_wallet_id = Column(Integer, ForeignKey('wallets.id'))
    amount = Column(Float)
    description = Column(String)
