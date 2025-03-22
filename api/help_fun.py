import random
import string
import bcrypt
from api.data import SessionLocal
from api.model import Admin, Transaction, TransactionType


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies if a given password matches the stored hash."""
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

# Hash password
def hash_password(password: str) -> str:
    """Hashes a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)
    return hashed_password.decode()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# helper function confirm whether a user is authorized to access admin api
def is_admin(db,admin_id,password):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        return False
    if verify_password(password,admin.password_hash):
        return True
    return False

#generate a unique transaction id based on the transaction type as prefix
def generate_transaction_id(type,session):
    """Generates a unique transaction number with a specific format and retries if needed."""
    
    if type == TransactionType.payment:
        prefix = "PY"
    elif type == TransactionType.deposit:
        prefix = "DP"
    elif type == TransactionType.withdrawal:
        prefix = "WD"
    
    while True:
        unique_part = ''.join(random.choices(string.digits, k=8))  # 10-digit random number
        transaction_number = f"{prefix}{unique_part}"
        
        # Check if the account number already exists
        if not session.query(Transaction).filter(Transaction.transaction_id == transaction_number).first():
            return transaction_number
