const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user is patient or doctor
        if (decoded.role === 'patient') {
            req.patient = await Patient.findById(decoded.id);
            req.userRole = 'patient';
        } else if (decoded.role === 'doctor') {
            req.doctor = await Doctor.findById(decoded.id);
            req.userRole = 'doctor';
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

// Authorize specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.userRole} is not authorized to access this route`
            });
        }
        next();
    };
};

// Generate JWT Token
exports.generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
