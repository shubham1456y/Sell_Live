# Live Stream Shopping Application

A full-stack live commerce platform built with React Native (Expo) and Node.js.

## 🌟 Features

- **Live Streaming**: Real-time video streaming with product showcasing
- **E-Commerce**: Complete product catalog with variants and inventory management
- **Seller Dashboard**: Onboarding, product management, and analytics
- **Secure Checkout**: Cart management and order processing
- **User Authentication**: JWT-based auth with role management

## 📁 Project Structure

This repository contains two main branches:

- **`master`**: Frontend (React Native - Expo)
- **`dev1`**: Backend (Node.js + Express + PostgreSQL)

## 🚀 Quick Start

### Frontend (master branch)
```bash
git checkout master
cd frontend
npm install
npm start
```

### Backend (dev1 branch)
```bash
git checkout dev1
cd backend
npm install
# Configure .env file
npm run db:init
npm run dev
```

## 📚 Documentation

- Frontend: See `frontend/README.md`
- Backend: See `backend/README.md`
- API Documentation: See `backend/docs/backend_api_design.md`
- Database Schema: See `backend/docs/schema.sql`

## 🛠️ Tech Stack

**Frontend:**
- React Native (Expo)
- React Navigation
- Async Storage

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Zod Validation
- Pino Logging

## 📄 License

ISC
