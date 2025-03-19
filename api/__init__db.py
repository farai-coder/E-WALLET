from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"  # Change this to your database URL

# Create an engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # Use check_same_thread for SQLite
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative models
Base = declarative_base()

# Import your models
from model import ServiceModel, UserModel, WalletModel, TransactionModel

# Create the database tables
def init_db():
    Base.metadata.create_all(bind=engine)

