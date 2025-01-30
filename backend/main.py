from fastapi import FastAPI, Depends, HTTPException
from . import services, schemas, ai, payment
from .database import SessionLocal, engine
from sqlalchemy.orm import Session

# Initialize FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root endpoint to check if API is running
@app.get("/")
def read_root():
    return {"message": "Campus Services Backend is up!"}

# Canteen Ordering Endpoints
@app.post("/canteen/order")
def create_canteen_order(order: schemas.CanteenOrder, db: Session = Depends(get_db)):
    return services.create_canteen_order(order, db)

@app.get("/canteen/status/{order_id}")
def get_canteen_status(order_id: int, db: Session = Depends(get_db)):
    return services.get_canteen_status(order_id, db)

@app.get("/canteen/predict-peak-time")
def predict_peak_time(db: Session = Depends(get_db)):
    return ai.predict_peak_time(db)

# Printing Service Endpoints
@app.post("/print/order")
def create_print_order(order: schemas.PrintOrder, db: Session = Depends(get_db)):
    return services.create_print_order(order, db)

@app.get("/print/status/{order_id}")
def get_print_status(order_id: int, db: Session = Depends(get_db)):
    return services.get_print_status(order_id, db)

# Stationery Ordering Endpoints
@app.post("/stationery/order")
def create_stationery_order(order: schemas.StationeryOrder, db: Session = Depends(get_db)):
    return services.create_stationery_order(order, db)

# Payment Integration
@app.post("/payment")
def process_payment(payment_info: schemas.Payment, db: Session = Depends(get_db)):
    return payment.process_payment(payment_info, db)

# AI-enhanced endpoints (like peak-time prediction)
