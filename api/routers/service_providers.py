
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.data import *
from api.help_fun import get_db, hash_password, verify_password
from api.model import *
from api.schemas import ServiceCreate, ServiceProviderCreate

router = APIRouter()

# add a service
@router.post("/add_service/{service_provider_acc}")
def add_service(service: ServiceCreate, db: Session = Depends(get_db)):
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == service.service_provider_acc).first()
    if not service_provider:
        raise HTTPException(status_code=404,detail= f"Service Provier {service.service_provider_acc} not found")
    
    #create a new service
    new_service = Service(
        service_provider_acc = service_provider.account_number,
        name = service.name,
        description = service.description
    )
    
    db.add(new_service)
    db.commit()
    return {"message": "Service created successfully"}

#remove a service
@router.delete("/delete_service/{service_id}")
def delete_service(service_id:str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return {"message": "Service deleted successfully"}
    
#edit a service
@router.put("/edit_service/{service_id}")
def edit_service(service_id: str, service: ServiceCreate, db: Session = Depends(get_db)):
    editing_service = db.query(Service).filter(Service.id == service_id).first()
    if not editing_service:
        raise HTTPException(status_code=404, detail="Service not found")
    editing_service.name = service.name
    editing_service.description = service.description
    db.commit()
    return {"message": "Service updated successfully"}

#get all services for a service provider
@router.get("/services/{service_provider_acc}")
def get_services(service_provider_acc: str, db: Session = Depends(get_db)):
    services = db.query(Service).filter(Service.service_provider_acc == service_provider_acc).all()
    if not services:
        raise HTTPException(status_code=404, detail="No services found")
    return services

# Get all services
@router.get("/services")
def get_all_services(db: Session = Depends(get_db)):
    services = db.query(Service).all()
    if not services:
        raise HTTPException(status_code=404, detail="No services found")
    return services

#get a single service
@router.get("/service/{service_id}")
def get_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


    
#edit a service provider
@router.put("/edit_service_provider/{service_provider_acc}")
def edit_service_provider(service_provider_acc: str, service_provider: ServiceProviderCreate, db: Session = Depends(get_db)):
    editing_service_provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == service_provider_acc).first()
    if not editing_service_provider:
        raise HTTPException(status_code=404, detail="Service Provider not found")
    editing_service_provider.name = service_provider.name
    editing_service_provider.location = service_provider.location
    editing_service_provider.contact = service_provider.contact
    editing_service_provider.description = service_provider.description
    db.commit()
    return {"message": "Service Provider updated successfully"}


#change password
@router.put("/providers/{provider_account}/change_password")
def change_password(provider_account:str, current_password: str,new_password, db: Session = Depends(get_db)):
    
    provider = db.query(ServiceProvider).filter(ServiceProvider.account_number == provider_account).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    #check if the current password is correct
    if not verify_password(current_password, provider.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect password")
    #hash the new password
    provider.password_hash = hash_password(new_password)
    db.commit()
    return provider

# Get a single service provider
@router.get("/service_provider/{service_provider_id}")
def admin_get_service_provider(service_provider_id: int, db: Session = Depends(get_db)):
    service_provider = db.query(ServiceProvider).filter(ServiceProvider.id == service_provider_id).first()
    if not service_provider:
        raise HTTPException(status_code=404, detail="Service Provider not found")
    return service_provider




