from pydantic import BaseModel
from typing import List, Optional

class Service(BaseModel):
    id: int
    name: str
    description: str

class User(BaseModel):
    id: int
    name: str
    password: str
    wallet_ids: List[int]
    services_offered: List[Service] = []  # Services offered by the user
    services_received: List[Service] = []  # Services received by the user

class Wallet(BaseModel):
    id: int
    user_id: int
    balance: float

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
