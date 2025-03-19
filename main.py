from fastapi import FastAPI
from api.routers import user, wallet, transaction, admin
import uvicorn

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(wallet.router, prefix="/wallets", tags=["wallets"])
app.include_router(transaction.router, prefix="/transactions", tags=["transactions"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the e-wallet system!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
