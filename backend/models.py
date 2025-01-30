from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class CanteenOrder(Base):
    __tablename__ = 'canteen_orders'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    food_items = Column(String)
    total_price = Column(Float)
    status = Column(String)  # "pending", "preparing", "ready", etc.
    predicted_peak_time = Column(String)  # AI predictions for peak hours

class PrintOrder(Base):
    __tablename__ = 'print_orders'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    document_name = Column(String)
    page_count = Column(Integer)
    status = Column(String)  # "queued", "in-progress", "completed"

class StationeryOrder(Base):
    __tablename__ = 'stationery_orders'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    items = Column(String)  # e.g., 'notebook, pen'
    total_price = Column(Float)

class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer)
    amount = Column(Float)
    status = Column(String)  # "pending", "successful", "failed"
    payment_method = Column(String)  # "UPI", "Card", "Campus Wallet"
