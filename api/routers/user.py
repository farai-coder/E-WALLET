from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.help_fun import get_db
from api.schemas import *
from api.model import *
from api.data import *
from api.routers.service_providers import verify_password, hash_password

router = APIRouter()



# change the password of a user
@router.post("/change_password", response_model=UserResponse)
def change_password(request: ChangePasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == request.reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    #check if the current password is correct
    if not verify_password(request.current_password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect password")
    #hash the new password
    user.password_hash = hash_password(request.new_password)
    db.commit()
    return user


# Get a single user
@router.get("/user/{reg_number}", response_model=UserResponse)
def admin_get_user(reg_number:str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reg_number == reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

#edit a user
@router.put("/edit_user/{reg_number}")
def admin_edit_user(user: UserCreate, db: Session = Depends(get_db)):
    editing_user = db.query(User).filter(User.reg_number == user.reg_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    editing_user.name = user.name.capitalize()
    editing_user.surname = user.surname.capitalize()
    editing_user.reg_number = user.reg_number.lower()
    editing_user.email = user.email
    editing_user.phone_number = user.phone_number
    db.commit()
    return {"message": "User updated successfully"}

