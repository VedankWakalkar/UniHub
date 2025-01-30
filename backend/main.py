from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import os
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from prisma import Prisma, errors
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from passlib.context import CryptContext 

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
api_key ="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"
if not api_key:
    raise ValueError("GROQ_API_KEY is not set in environment variables.")

# Initialize Groq client
client = Groq(api_key="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")

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


db = Prisma()

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

# Pydantic models for request/response validation
class StudentCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class DocumentCreate(BaseModel):
    studentId: str
    documentType: str
    copies: int
    color: bool
    oneSidePrint: bool
    token: str
    payment: float

class DocumentResponse(BaseModel):
    id: str
    studentId: str
    documentType: str
    copies: int
    color: bool
    oneSidePrint: bool
    token: str
    payment: float
    orderTrack: str
    createdAt: datetime

# Create a new student
@app.post("/register/", response_model=StudentCreate)
async def create_student(student: StudentCreate):
    try:
        created_student = await db.student.create(
            data={
                "name": student.name,
                "email": student.email,
                "password": student.password,
                "role": student.role,
            }
        )
        return created_student
    except errors.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Email already registered")

# Get all students
@app.get("/students/", response_model=List[StudentCreate])
async def get_students():
    students = await db.student.find_many()
    return students

# Create a new document
@app.post("/documents/", response_model=DocumentResponse)
async def create_document(document: DocumentCreate):
    try:
        created_document = await db.document.create(
            data={
                "studentId": document.studentId,
                "documentType": document.documentType,
                "copies": document.copies,
                "color": document.color,
                "oneSidePrint": document.oneSidePrint,
                "token": document.token,
                "payment": document.payment,
            }
        )
        return created_document
    except errors.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Token already exists")

# Get all documents
@app.get("/documents/", response_model=List[DocumentResponse])
async def get_documents():
    documents = await db.document.find_many()
    return documents

# Get a single document by ID
@app.get("/documents/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str):
    document = await db.document.find_unique(where={"id": document_id})
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

# Update a document
@app.put("/documents/{document_id}", response_model=DocumentResponse)
async def update_document(document_id: str, document: DocumentCreate):
    updated_document = await db.document.update(
        where={"id": document_id},
        data={
            "studentId": document.studentId,
            "documentType": document.documentType,
            "copies": document.copies,
            "color": document.color,
            "oneSidePrint": document.oneSidePrint,
            "token": document.token,
            "payment": document.payment,
        }
    )
    if updated_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return updated_document

# Delete a document
@app.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    deleted_document = await db.document.delete(where={"id": document_id})
    if deleted_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}

#Login
# Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str

# Password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Helper function to verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Login endpoint
@app.post("/login")
async def login(request: LoginRequest):
    # Fetch user from the database
    user = await db.student.find_unique(where={"email": request.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify password
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Return user role or token (you can use JWT for tokens)
    return {"role": user.role}

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Registration endpoint
@app.post("/register")
async def register(request: RegisterRequest):
    # Check if the email is already registered
    existing_user = await db.student.find_unique(where={"email": request.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = hash_password(request.password)

    # Create the user in the database
    user = await db.student.create(
        data={
            "name": request.name,
            "email": request.email,
            "password": hashed_password,
            "role": request.role,
        }
    )
    return {"message": "User registered successfully", "user": user}