import random
import string
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from api.data import *
from api.help_fun import get_db, hash_password,verify_password, is_admin, generate_transaction_id
from api.model import *
from api.schemas import AdminCreate, AdminEdit, DepositRequest, DepositResponse, ServiceProviderCreate, TransactionResponse, UserCreate, UserResponse, WalletResponse 
import pandas as pd

router = APIRouter()

# Create a function to generate a unique account number
def generate_account_number(session):
    """Generates a unique account number with a specific format and retries if needed."""
    prefix = "SP"
    
    while True:
        unique_part = ''.join(random.choices(string.digits, k=8))  # 10-digit random number
        account_number = f"{prefix}{unique_part}"
        
        # Check if the account number already exists
        if not session.query(ServiceProvider).filter_by(account_number=account_number).first():
            return account_number

###admin logic###

# Create a new admin

@router.post("/create_admin")
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    #check if admin is authourized 
    if not is_admin(db,admin.admin_id,admin.admin_password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    #create a new admin
    new_admin = Admin(
        username=admin.username,
        password_hash=hash_password(admin.password)
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return {"id": new_admin.id , "username" : new_admin.username, "message": "Admin created successfully"}

# Get all admins
@router.get("/admins")
def get_admins(admin_id: int , password : str, db: Session = Depends(get_db)):
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized") 
    admins = db.query(Admin).all()
    return admins

# Get a single admin
@router.get("/admin/{username}")
def get_admin(username:str , admin_id:int , password:str, db: Session = Depends(get_db)):
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized") 
    admin = db.query(Admin).filter(Admin.username == username).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

# Delete an admin
@router.delete("/delete_admin/{username}")
def delete_admin(username:str, admin_id: int ,password:str, db: Session = Depends(get_db)):
    #check if user is an authorized admin 
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    admin = db.query(Admin).filter(Admin.username == username).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(admin)
    db.commit()
    return {"message": "Admin deleted successfully"}

# Edit an admin
@router.put("/edit_admin/{username}")
def edit_admin(admin: AdminEdit , db: Session = Depends(get_db)):
    #an admin can only edit their own password
    #check if admin has authourity
    try:
        if not is_admin(db,admin.admin_id,admin.admin_password):
            raise HTTPException(status_code=401, detail="Unauthorized")
        editing_admin = db.query(Admin).filter(Admin.id == admin.admin_id).first()
        if admin.username:
            editing_admin.username = admin.username
        if admin.new_pass_word :
            editing_admin.password_hash = hash_password(admin.new_pass_word)
        return {"message": "Admin updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
### end of admin logic ###


### users  logic ###

# Get all users

# create a new user
@router.post("/create_user")
def admin_create_user(admin_id:int, password:str, user: UserCreate, db: Session = Depends(get_db)):
    #check if the admin is authorized
    try:
        if not is_admin(db,admin_id,password):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        #create a new user
        new_user = User(
            name=user.name.capitalize(),
            surname=user.surname.capitalize(),
            reg_number=user.reg_number.lower(),
            email=user.email,
            phone_number=user.phone_number,
            password_hash = hash_password(user.reg_number.lower())
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        #create a wallet for the user
        new_wallet = Wallet(
            student_reg_number=new_user.reg_number,
            balance=0
        )
        db.add(new_wallet)
        db.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))       

#bulk upload from csv file to create users
@router.post("/create_users_bulk")
async def bulk_create_users(admin_id: int ,password:str,file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        #check if admin is authorized
        if not is_admin(db,admin_id,password):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        # Determine file type and read data
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file, engine="openpyxl")
        else:
            raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")

        for _, row in df.iterrows():
            # Create User instance
            new_user = User(
                name=row["name"].capitalize(),
                surname=row["surname"].capitalize(),
                reg_number=row["reg_number"].lower(),
                email=row["email"],
                phone_number=row["phone_number"],
                password_hash=hash_password(row["reg_number"].lower())  
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            # Create Wallet instance
            new_wallet = Wallet(
                student_reg_number=new_user.reg_number,
                balance=0
            )
            db.add(new_wallet)
            db.commit()
        
        return {"message": f"{len(df)} users created successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# Get all users
@router.get("/users")
def admin_get_users(admin_id: int, password : str , db: Session = Depends(get_db)):
    # check if admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    users = db.query(User).all()
    return users


#delete a user
@router.delete("/delete_user/{user_id}")
def admin_delete_user(admin_id: int, password : str ,reg_number:str, db: Session = Depends(get_db)):
       # check if admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user = db.query(User).filter(User.reg_number == reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

#bulk delete users
@router.delete("/bulk_delete_users")
async def bulk_delete_users(admin_id:int,password:str,file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # check if admin is authorized
        if not is_admin(db,admin_id,password):
            raise HTTPException(status_code=401, detail="Unauthorized")
        # Determine file type and read data
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file, engine="openpyxl")
        else:
            raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")
        
        for _, row in df.iterrows():
            # delete each user if it exists
            reg_number=row["reg_number"].lower()
            user  = db.query(User).filter(User.reg_number == reg_number).first()
            if not user:
                raise HTTPException(status_code=404, detail=f"user {reg_number} not found")
            db.delete(user)
        db.commit()
        
        return {"message": f"{len(df)} users deleted successfully"}
            
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

        

# Deposit funds into a user's wallet
@router.post("/deposit_funds")
def deposit_funds(admin_id:int,password:str,deposit_request: DepositRequest, db: Session = Depends(get_db)):
    # Logic to deposit funds into a user's wallet
    #check if the admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
                            
    #check if the user exists
    user = db.query(User).filter(User.reg_number == deposit_request.reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    #check if the wallet exists
    wallet = db.query(Wallet).filter(Wallet.student_reg_number == user.reg_number).first()
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    #create a transaction
    reference = "DEPOSIT_" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
    new_transaction = Transaction(
        transaction_id  = generate_transaction_id(TransactionType.deposit,db),
        wallet_id_to=wallet.id,    
        amount=deposit_request.amount,
        reference=reference,
        transaction_type=TransactionType.deposit,
        status=TransactionStatus.completed
    )
    db.add(new_transaction)
    wallet.balance += deposit_request.amount
    db.commit()
    # add total balance to the main wallet
    main_wallet = db.query(Main_Wallet).first()
    main_wallet.total_balance += deposit_request.amount
    db.commit()
    
    return {"message": "Funds deposited successfully"}






### end of users logic ###




### service provider logic ###
 

#create a service provide

@router.post("/create_service_provider")
def create_service_provider(service_provider: ServiceProviderCreate, db: Session = Depends(get_db)):
    #check if admin is authorized
    if not is_admin(db,service_provider.admin_id,service_provider.admin_password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    account_number = generate_account_number(db)
    new_service_provider = ServiceProvider(
        account_number=account_number,
        name=service_provider.name,
        location=service_provider.location,
        contact=service_provider.contact,
        password=hash_password(service_provider.password),
        description=service_provider.description
    )
    db.add(new_service_provider)
    db.commit()
    db.refresh(new_service_provider)
    
    #create a wallet for the service provider
    new_wallet = Wallet(
        service_provider_id=new_service_provider.account_number,
        balance=0
    )
    db.add(new_wallet)
    db.commit()
    return {"message": "Service Provider created successfully"}


#delete a service provider  
@router.delete("/delete_service_provider/{service_provider_acc}")
def delete_service_provider(admin_id:int,password:str,service_provider_acc: str, db: Session = Depends(get_db)):
    #check if admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == service_provider_acc).first()
    if not service_provider:
        raise HTTPException(status_code=404, detail="Service Provider not found")
    db.delete(service_provider)
    db.commit()
    return {"message": "Service Provider deleted successfully"}


#get all service providers
@router.get("/service_providers")
def admin_get_service_providers(admin_id: int,password:str, db: Session = Depends(get_db)):
    # check  is admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    service_providers = db.query(ServiceProvider).all()
    return service_providers




### end of service provider loic ###

# get all walllets
@router.get("/wallets", response_model=list[WalletResponse])
def admin_get_wallets(admin_id: int, password :str, db: Session = Depends(get_db)):
    # check  is admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    wallets = db.query(Wallet).all()
    return wallets

# Get all transactions
@router.get("/transactions", response_model=list[TransactionResponse])
def admin_get_transactions(admin_id: int, password:str, db: Session = Depends(get_db)):
    # check  is admin is authorized
    if not is_admin(db,admin_id,password):
        raise HTTPException(status_code=401, detail="Unauthorized")
    transactions = db.query(Transaction).all()
    return transactions




@router.post("/approve_user/{user_id}")
def approve_user(user_id: int,  db: Session = Depends(get_db)):
    # Logic to approve a user
    return {"message": f"User {user_id} approved"}

@router.post("/block_user/{user_id}")
def block_user(user_id: int,  db: Session = Depends(get_db)):
    # Logic to block a user
    return {"message": f"User {user_id} blocked"}
