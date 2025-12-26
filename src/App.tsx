import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';

// Auth pages
import PatientSignup from './pages/auth/PatientSignup';
import PatientLogin from './pages/auth/PatientLogin';
import DoctorSignup from './pages/auth/DoctorSignup';
import DoctorLogin from './pages/auth/DoctorLogin';

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientEditProfile from './pages/patient/PatientEditProfile';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientFavourites from './pages/patient/PatientFavourites';
import PatientDependants from './pages/patient/PatientDependants';
import PatientMedicalRecords from './pages/patient/PatientMedicalRecords';
import PatientMedicine from './pages/patient/PatientMedicine';
import PatientWallet from './pages/patient/PatientWallet';
import PatientInvoices from './pages/patient/PatientInvoices';
import PatientMessages from './pages/patient/PatientMessages';
import PatientVitals from './pages/patient/PatientVitals';
import PatientSettings from './pages/patient/PatientSettings';

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorEditProfile from './pages/doctor/DoctorEditProfile';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorTimings from './pages/doctor/DoctorTimings';
import DoctorRequests from './pages/doctor/DoctorRequests';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorInvoices from './pages/doctor/DoctorInvoices';
import DoctorReviews from './pages/doctor/DoctorReviews';
import DoctorAccounts from './pages/doctor/DoctorAccounts';
import DoctorChangePassword from './pages/doctor/DoctorChangePassword';
import DoctorSocialMedia from './pages/doctor/DoctorSocialMedia';
import DoctorPayoutSettings from './pages/doctor/DoctorPayoutSettings';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />

      {/* Patient auth routes */}
      <Route path="/patient/signup" element={<PatientSignup />} />
      <Route path="/patient/login" element={<PatientLogin />} />

      {/* Doctor auth routes */}
      <Route path="/doctor/signup" element={<DoctorSignup />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />

      {/* Protected patient routes */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/edit-profile"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientEditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/favourites"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientFavourites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/dependants"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientDependants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/medical-records"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientMedicalRecords />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/medicine"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientMedicine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/wallet"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientWallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/invoices"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientInvoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/messages"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/vitals"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientVitals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/settings"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientSettings />
          </ProtectedRoute>
        }
      />

      {/* Protected doctor routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/edit-profile"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorEditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/timings"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorTimings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/requests"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorPatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/invoices"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorInvoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/reviews"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/accounts"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/change-password"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/social-media"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorSocialMedia />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/payout-settings"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorPayoutSettings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
