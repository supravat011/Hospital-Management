# EHR NOW - Hospital Management System

A comprehensive, modern Electronic Health Records (EHR) management system built with React, TypeScript, Node.js, and MongoDB. This full-stack application provides seamless healthcare management for patients, doctors, and administrators.

## 🌟 Features

### Patient Portal
- **Patient Registration & Authentication** - Secure signup and login with JWT authentication
- **Appointment Booking** - Schedule appointments with doctors across specialties
- **Medical Records** - View and manage medical history, prescriptions, and lab reports
- **Health Vitals Tracking** - Monitor blood pressure, heart rate, glucose levels, and more
- **Dependant Management** - Add and manage family members' health records
- **Invoice & Billing** - View and download medical invoices

### Doctor Dashboard
- **Appointment Management** - View and manage patient appointments
- **Patient Records** - Access comprehensive patient medical histories
- **Prescription Management** - Create and manage prescriptions
- **Weekly Overview** - Analytics and insights on patient visits
- **Recent Patients** - Quick access to recently seen patients

### Admin Panel
- **User Management** - Manage patients, doctors, and staff
- **Department Management** - Organize hospital departments and specialties
- **Analytics Dashboard** - Hospital-wide statistics and insights
- **Appointment Oversight** - Monitor all appointments across the system

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Shadcn UI** - Beautiful, accessible component library
- **Radix UI** - Headless UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Request validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** - Version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Hospital-Management
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create .env file in root directory
# Add the following environment variables:
VITE_API_URL=http://localhost:5000/api
```

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Create .env file in server directory
# Add the following environment variables (see Environment Variables section below)
```

### 4. Environment Variables

#### Frontend (.env in root directory)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (server/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital-management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hospital-management

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 5. Run the Application

#### Development Mode

**Terminal 1 - Frontend:**
```bash
npm run dev
```
The frontend will run on `http://localhost:8080`

**Terminal 2 - Backend:**
```bash
npm run server
```
The backend will run on `http://localhost:5000`

#### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Hospital-Management/
├── src/                          # Frontend source code
│   ├── components/              # Reusable React components
│   ├── pages/                   # Page components
│   │   ├── auth/               # Authentication pages
│   │   ├── patient/            # Patient portal pages
│   │   ├── doctor/             # Doctor dashboard pages
│   │   └── admin/              # Admin panel pages
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── main.tsx                # Application entry point
├── server/                      # Backend source code
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   └── utils/                  # Utility functions
├── public/                      # Static assets
└── package.json                # Dependencies and scripts
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid JWT tokens
- Tokens expire after 24 hours (configurable)
- Role-based access control (Patient, Doctor, Admin)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Patient registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients` - Get all patients (Admin only)
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor (Admin only)

### Appointments
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Prepare for deployment:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

3. **Set environment variables in Vercel:**
   - `VITE_API_URL` - Your backend API URL

### Backend Deployment (Render)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node server.cjs`

4. **Set environment variables:**
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to `production`

### Database Setup (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Get your connection string
5. Update `MONGODB_URI` in your environment variables

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build the project to check for errors
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Note:** This is a demonstration project. For production use, ensure proper security measures, data encryption, and compliance with healthcare regulations (HIPAA, GDPR, etc.).
