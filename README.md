# UniHub

Campus Services Automation Platform

Project Overview

This project is a web and mobile platform designed to automate and digitize common campus services, reducing manual effort and improving user convenience. It streamlines service delivery for students and service providers alike, incorporating AI-driven features for enhanced user experience.

Features

1️⃣ Printing & Stationery Ordering System

Upload documents (PDF, DOCX) for printing.

Customize print settings (color/BW, page range, paper size).

Order stationery items (files, notebooks, folders, etc.).

Secure payment integration (UPI, campus wallet, card).

Pickup notification and QR code-based collection.

AI-powered peak hour predictions for scheduling.

2️⃣ Canteen Ordering System

Live menu with real-time availability.

Order food for pickup or dine-in table booking.

AI suggests less crowded dining hours.

Secure payment integration.

Order tracking and notification system.

3️⃣ Admin Dashboard

View real-time orders and print requests.

Manage and fulfill printing and canteen requests.

Track inventory and stock levels.

AI-driven demand forecasting.

4️⃣ AI Enhancements

Peak Time Predictions: AI suggests off-peak hours for smoother service.

Smart Chatbot: Handles user FAQs and order placement via chat.

Personalized Recommendations: Suggests frequently ordered items based on user history.

Tech Stack

Frontend: Next.js

Backend: FastAPI

Database: Prisma DB

Payment Integration: Razorpay / Stripe

Installation & Setup

Clone the repository:

``git clone https://github.com/VedankWakalkar/UniHub.git``

Install dependencies:

```
cd UniHub
npm init -y
npm install  # For frontend
```

Set up the database:

```
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```

Start the development server:

```
npm run dev  # Frontend
cd backend
uvicorn backend.main:app --reload  # Backend
```
