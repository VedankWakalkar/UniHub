from pydantic import BaseModel
from typing import List

class CanteenOrder(BaseModel):
    user_id: int
    food_items: List[str]
    total_price: float

class PrintOrder(BaseModel):
    user_id: int
    document_name: str
    page_count: int
    color: bool  # True for color, False for B/W
    size: str  # "A4", "A3", etc.

class StationeryOrder(BaseModel):
    user_id: int
    items: List[str]
    total_price: float

class Payment(BaseModel):
    order_id: int
    amount: float
    payment_method: str  # "UPI", "Card", "Campus Wallet"
