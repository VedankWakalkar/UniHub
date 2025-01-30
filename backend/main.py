from fastapi import FastAPI, HTTPException
# from prisma import Prisma
# from prisma.models import Student, PrintJob, CanteenOrder, Payment
from pydantic import BaseModel
from typing import List
import os
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

app = FastAPI()
# prisma = Prisma()

# Initialize the Prisma client
@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

# Pydantic models for request validation
class CreateStudent(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str = None

class CreatePrintJob(BaseModel):
    student_id: int
    document: str
    print_settings: dict

class CreateCanteenOrder(BaseModel):
    student_id: int
    items: List[str]
    total_amount: float
    payment_method: str

class CreatePayment(BaseModel):
    student_id: int
    amount: float
    payment_method: str

# Groq API key setup
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

# Initialize Groq client
client = Groq(api_key=api_key)

class UserRequest(BaseModel):
    user_content: str

# Allow CORS for all domains (or you can restrict it to specific domains)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all domains, change to specific domains for more security
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.post("/chat")
async def handle_service_request(content: UserRequest):
    # Define the system prompt with examples relevant to the campus services
    system_prompt = {
        "role": "system",
        "content": """
        You are an AI assistant specialized in campus services automation. Your goal is to help students interact with the campus service system, such as printing requests and canteen orders. Your responses should be specific to the services requested, focusing on providing clear, actionable information. The output must be concise and relevant to the student's request.

        Example 1:
        Input: "I want to order 10 prints for my assignment."
        Output:
        • The print job has been successfully queued for 10 prints.
        • Estimated completion time: 15 minutes.
        • You will receive a notification once the prints are ready.

        Example 2:
        Input: "Can I place an order for a sandwich at the canteen?"
        Output:
        • The canteen is currently open, and you can order a sandwich.
        • Estimated delivery time: 20 minutes.
        • Please specify your sandwich choice for the order.

        Now, process the following input and provide the necessary service details or steps for the user:
        """
    }

    # Prepare the full prompt with user input
    user_input = content.user_content
    full_prompt = system_prompt["content"] + "\n" + f"Input: \"{user_input}\"\nOutput:"

    # Call the Groq API for response
    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[system_prompt, {"role": "user", "content": full_prompt}],
        max_tokens=200,
        temperature=0.7
    )

    service_response = response.choices[0].message.content
    return {"response": service_response}


# Routes for CRUD operations

# 1. Create Student
@app.post("/students/")
async def create_student(student: CreateStudent):
    student = await prisma.student.create(
        data={
            'firstName': student.first_name,
            'lastName': student.last_name,
            'email': student.email,
            'phoneNumber': student.phone_number,
        }
    )
    return student

# 2. Read (Get) Student by ID
@app.get("/students/{student_id}")
async def get_student(student_id: int):
    student = await prisma.student.find_unique(where={"id": student_id})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# 3. Update Student
@app.put("/students/{student_id}")
async def update_student(student_id: int, student: CreateStudent):
    updated_student = await prisma.student.update(
        where={"id": student_id},
        data={
            'firstName': student.first_name,
            'lastName': student.last_name,
            'email': student.email,
            'phoneNumber': student.phone_number,
        }
    )
    return updated_student

# 4. Delete Student
@app.delete("/students/{student_id}")
async def delete_student(student_id: int):
    student = await prisma.student.delete(where={"id": student_id})
    return {"message": f"Student {student_id} deleted successfully"}

# 5. Create Print Job
@app.post("/print-jobs/")
async def create_print_job(print_job: CreatePrintJob):
    print_job = await prisma.printJob.create(
        data={
            'student': {'connect': {'id': print_job.student_id}},
            'document': print_job.document,
            'printSettings': {
                'create': {
                    'color': print_job.print_settings['color'],
                    'paperSize': print_job.print_settings['paperSize'],
                    'copies': print_job.print_settings['copies'],
                    'printType': print_job.print_settings['printType'],
                }
            }
        }
    )
    return print_job

# 6. Get Print Jobs for a Student
@app.get("/students/{student_id}/print-jobs")
async def get_print_jobs(student_id: int):
    print_jobs = await prisma.printJob.find_many(where={"studentId": student_id})
    return print_jobs

# 7. Create Canteen Order
@app.post("/canteen-orders/")
async def create_canteen_order(order: CreateCanteenOrder):
    order = await prisma.canteenOrder.create(
        data={
            'student': {'connect': {'id': order.student_id}},
            'items': str(order.items),  # You can store items as a string or JSON
            'totalAmount': order.total_amount,
            'payment': {
                'create': {
                    'paymentMethod': order.payment_method,
                    'amount': order.total_amount,
                    'status': 'PENDING',
                }
            }
        }
    )
    return order

# 8. Get Canteen Orders for a Student
@app.get("/students/{student_id}/canteen-orders")
async def get_canteen_orders(student_id: int):
    orders = await prisma.canteenOrder.find_many(where={"studentId": student_id})
    return orders

# 9. Create Payment
@app.post("/payments/")
async def create_payment(payment: CreatePayment):
    payment = await prisma.payment.create(
        data={
            'student': {'connect': {'id': payment.student_id}},
            'amount': payment.amount,
            'paymentMethod': payment.payment_method,
            'status': 'PENDING',
        }
    )
    return payment

# 10. Get Payments for a Student
@app.get("/students/{student_id}/payments")
async def get_payments(student_id: int):
    payments = await prisma.payment.find_many(where={"studentId": student_id})
    return payments
