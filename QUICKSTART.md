# EHR NOW - Quick Start Guide

## 🚀 Start the System

### 1. Start MongoDB
Make sure MongoDB is running on your system.

### 2. Start Backend Server
```bash
npm run server
```
✅ Backend API running on http://localhost:5000

### 3. Start Frontend (new terminal)
```bash
npm run dev
```
✅ Frontend running on http://localhost:8080

---

## 📋 What's Been Built

### Backend (100% Complete)
- ✅ All database models (Patient, Doctor, Visit, ScanReport, Query)
- ✅ Authentication APIs (Patient & Doctor signup/login)
- ✅ Patient module APIs (profile, visits, PDF, scans, queries)
- ✅ Doctor module APIs (search, add visits, upload scans, statistics)
- ✅ JWT authentication & role-based access
- ✅ PDF generation for visit summaries
- ✅ File upload for scan reports
- ✅ OPID auto-generation system

### Frontend (Service Layer Complete)
- ✅ API service layer (auth, patient, doctor)
- ✅ Authentication context
- ✅ Protected routes
- ⏳ UI pages needed (see below)

---

## 📝 Frontend Pages to Create

You need to create these pages to complete the UI:

### Patient Module
1. `/patient/signup` - Patient registration form
2. `/patient/login` - Patient login page
3. `/patient/dashboard` - Profile + visit history
4. `/patient/visit/:id` - Visit details with Tamil audio

### Doctor Module
1. `/doctor/signup` - Doctor registration form
2. `/doctor/login` - Doctor login page
3. `/doctor/dashboard` - Statistics + patient search
4. `/doctor/add-visit` - Add patient visit form
5. `/doctor/queries` - Query management

---

## 🔑 API Examples

### Test Patient Signup
```bash
POST http://localhost:5000/api/auth/patient/signup
{
  "name": "Test Patient",
  "age": 65,
  "bloodGroup": "O+",
  "height": 170,
  "weight": 70,
  "mobileNumber": "9876543210",
  "password": "password123"
}
```

### Test Doctor Login
```bash
POST http://localhost:5000/api/auth/doctor/login
{
  "identifier": "doctor@example.com",
  "password": "password123"
}
```

---

## 🎯 Key Features

- **OPID Format**: `OPID-20251224-0001`
- **JWT Expiry**: 24 hours
- **File Upload**: Max 10MB, PDF/Images only
- **Tamil Audio**: Web Speech API (ta-IN, rate: 0.7)
- **Visit Records**: Never overwritten, always new entries

---

## 📁 Important Files

**Backend:**
- `server.js` - Main server file
- `server/.env` - Environment config
- `server/models/` - Database schemas
- `server/controllers/` - API logic
- `server/routes/` - API endpoints

**Frontend:**
- `src/services/` - API calls
- `src/context/AuthContext.tsx` - Auth state
- `src/components/ProtectedRoute.tsx` - Route protection

---

## ⚠️ Before Production

1. Change `JWT_SECRET` in `server/.env`
2. Set up proper MongoDB database (not localhost)
3. Configure CORS for production domain
4. Set up file storage (AWS S3 or similar)
5. Add input validation on frontend
6. Implement proper error handling UI
