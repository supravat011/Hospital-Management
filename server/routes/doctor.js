const express = require('express');
const {
    getProfile,
    updateProfile,
    searchPatient,
    addVisit,
    uploadScanReports,
    getAllPatients,
    getStats,
    getPatientVisits,
    getQueries,
    replyToQuery,
    getAppointments,
    getUpcomingAppointment,
    getInvoices,
    getWeeklyAnalytics,
    // Schedule
    getSchedule,
    updateSchedule,
    // Reviews
    getReviews,
    replyToReview,
    markReviewHelpful,
    // Accounts & Payouts
    getAccountStats,
    getPayouts,
    requestPayment,
    updateBankDetails,
    updatePayoutMethod,
    // Messages
    getConversations,
    getMessages,
    sendMessage,
    markMessageAsRead,
    // Social Media & Services
    updateSocialMedia,
    updateServices,
    // Appointment Requests
    getAppointmentRequests,
    acceptAppointmentRequest,
    rejectAppointmentRequest,
    updateAppointmentStatus
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes are protected and require doctor role
router.use(protect);
router.use(authorize('doctor'));

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Patient search and management
router.get('/patients/search', searchPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:patientId/visits', getPatientVisits);

// Visits
router.post('/visits', addVisit);
router.post('/visits/:visitId/scans', upload.array('scans', 5), uploadScanReports);

// Statistics
router.get('/stats', getStats);

// Queries
router.get('/queries', getQueries);
router.put('/queries/:queryId', replyToQuery);

// Appointments
router.get('/appointments', getAppointments);
router.get('/appointments/upcoming', getUpcomingAppointment);

// Invoices
router.get('/invoices', getInvoices);

// Analytics
router.get('/analytics/weekly', getWeeklyAnalytics);

// Schedule Management
router.get('/schedule', getSchedule);
router.put('/schedule', updateSchedule);

// Reviews
router.get('/reviews', getReviews);
router.put('/reviews/:id/reply', replyToReview);
router.put('/reviews/:id/helpful', markReviewHelpful);

// Accounts & Payouts
router.get('/accounts/stats', getAccountStats);
router.get('/payouts', getPayouts);
router.post('/accounts/request-payment', requestPayment);
router.put('/accounts/bank-details', updateBankDetails);
router.put('/payout-method', updatePayoutMethod);

// Messages
router.get('/conversations', getConversations);
router.get('/conversations/:conversationId/messages', getMessages);
router.post('/conversations/:conversationId/messages', sendMessage);
router.put('/messages/:id/read', markMessageAsRead);

// Social Media & Services
router.put('/social-media', updateSocialMedia);
router.put('/services', updateServices);

// Appointment Requests
router.get('/appointments/requests', getAppointmentRequests);
router.put('/appointments/requests/:id/accept', acceptAppointmentRequest);
router.put('/appointments/requests/:id/reject', rejectAppointmentRequest);
router.put('/appointments/:id/status', updateAppointmentStatus);

module.exports = router;
