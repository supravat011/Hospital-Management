const express = require('express');
const {
    getProfile,
    updateProfile,
    getVisitHistory,
    getVisitDetails,
    downloadVisitPDF,
    getVisitScans,
    downloadScan,
    sendQuery,
    getQueries,
    getNotifications,
    markNotificationRead,
    getDependants,
    addDependant,
    updateDependant,
    deleteDependant,
    getFavourites,
    addFavourite,
    removeFavourite
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require patient role
router.use(protect);
router.use(authorize('patient'));

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Visits
router.get('/visits', getVisitHistory);
router.get('/visits/:visitId', getVisitDetails);
router.get('/visits/:visitId/pdf', downloadVisitPDF);
router.get('/visits/:visitId/scans', getVisitScans);

// Scans
router.get('/scans/:scanId/download', downloadScan);

// Queries
router.post('/queries', sendQuery);
router.get('/queries', getQueries);

// Notifications
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);

// Dependants
router.get('/dependants', getDependants);
router.post('/dependants', addDependant);
router.put('/dependants/:id', updateDependant);
router.delete('/dependants/:id', deleteDependant);

// Favourites
router.get('/favourites', getFavourites);
router.post('/favourites/:doctorId', addFavourite);
router.delete('/favourites/:doctorId', removeFavourite);

module.exports = router;
