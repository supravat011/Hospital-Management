const express = require('express');
const {
    patientSignup,
    patientLogin,
    doctorSignup,
    doctorLogin
} = require('../controllers/authController');

const router = express.Router();

// Patient routes
router.post('/patient/signup', patientSignup);
router.post('/patient/login', patientLogin);

// Doctor routes
router.post('/doctor/signup', doctorSignup);
router.post('/doctor/login', doctorLogin);

module.exports = router;
