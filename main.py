from fastapi import FastAPI
from api.routers import user,admin,service_providers,login,transaction,payment,wallet
import uvicorn

app = FastAPI()

# add all the routes
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(service_providers.router, prefix="/service_providers", tags=["service_providers"])
app.include_router(login.router, prefix="/login", tags=["login"])
app.include_router(transaction.router,prefix="/transaction",tags=["transaction"])
app.include_router(payment.router,prefix="/payment",tags=["payment"])
app.include_router(wallet.router,prefix="/wallet",tags=["wallet"])

# add cors middleware


@app.get("/")
def read_root():
    return {"message": "Welcome to the student-wallet system!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
