from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.data import *
from api.help_fun import get_db, verify_password
from api.model import *
from api.schemas import UserLogin 

router = APIRouter()

        
#logic for user login
@router.post("/login")
def login_user(client: UserLogin, db: Session = Depends(get_db)):
    #check if the user is in the admin or user service_provider table
    admin = db.query(Admin).filter(Admin.username == client.username.lower()).first()
    user = db.query(User).filter(User.reg_number == client.username.lower()).first()
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == client.username).first()
    if admin:
        if verify_password(client.password, admin.password_hash):
            return {"message": "login successful" , "role" : "admin" , "id" : admin.id , "username" : admin.username}
    elif user:
        if verify_password(client.password, user.password_hash):
            return {"message": "login successful", "role" : "user"} 
    elif service_provider:
        if verify_password(client.password, service_provider.password_hash):
            return {"message": "login successful", "role" : "service_provider"}
    else:
        return {"message": "Login failed" , "role" : "none"}
    
