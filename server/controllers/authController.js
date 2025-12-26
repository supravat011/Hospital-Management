const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { generateToken } = require('../middleware/auth');
const { generatePatientId, generateDoctorId } = require('../utils/generateId');

// @desc    Register patient
// @route   POST /api/auth/patient/signup
// @access  Public
exports.patientSignup = async (req, res, next) => {
    try {
        const { name, age, bloodGroup, height, weight, mobileNumber, password } = req.body;

        // Check if patient already exists
        const existingPatient = await Patient.findOne({ mobileNumber });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: 'Patient with this mobile number already exists'
            });
        }

        // Generate unique patient ID
        let patientId;
        let isUnique = false;
        while (!isUnique) {
            patientId = generatePatientId();
            const existing = await Patient.findOne({ patientId });
            if (!existing) isUnique = true;
        }

        // Create patient
        const patient = await Patient.create({
            patientId,
            name,
            age,
            bloodGroup,
            height,
            weight,
            mobileNumber,
            password
        });

        // Generate token
        const token = generateToken(patient._id, 'patient');

        res.status(201).json({
            success: true,
            token,
            data: {
                id: patient._id,
                patientId: patient.patientId,
                name: patient.name,
                age: patient.age,
                bloodGroup: patient.bloodGroup,
                mobileNumber: patient.mobileNumber
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login patient
// @route   POST /api/auth/patient/login
// @access  Public
exports.patientLogin = async (req, res, next) => {
    try {
        const { identifier, password } = req.body; // identifier can be patientId or mobileNumber

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide patient ID/mobile number and password'
            });
        }

        // Find patient by patientId or mobileNumber
        const patient = await Patient.findOne({
            $or: [{ patientId: identifier }, { mobileNumber: identifier }]
        }).select('+password');

        if (!patient) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await patient.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(patient._id, 'patient');

        res.status(200).json({
            success: true,
            token,
            data: {
                id: patient._id,
                patientId: patient.patientId,
                name: patient.name,
                age: patient.age,
                bloodGroup: patient.bloodGroup,
                mobileNumber: patient.mobileNumber
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Register doctor
// @route   POST /api/auth/doctor/signup
// @access  Public
exports.doctorSignup = async (req, res, next) => {
    try {
        const {
            name,
            age,
            phoneNumber,
            email,
            medicalLicenseNumber,
            specialization,
            hospitalName,
            hospitalAddress,
            password
        } = req.body;

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({
            $or: [{ email }, { phoneNumber }, { medicalLicenseNumber }]
        });

        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Doctor with this email, phone number, or license number already exists'
            });
        }

        // Generate unique doctor ID
        let doctorId;
        let isUnique = false;
        while (!isUnique) {
            doctorId = generateDoctorId();
            const existing = await Doctor.findOne({ doctorId });
            if (!existing) isUnique = true;
        }

        // Create doctor
        const doctor = await Doctor.create({
            doctorId,
            name,
            age,
            phoneNumber,
            email,
            medicalLicenseNumber,
            specialization,
            hospitalName,
            hospitalAddress,
            password
        });

        // Generate token
        const token = generateToken(doctor._id, 'doctor');

        res.status(201).json({
            success: true,
            token,
            data: {
                id: doctor._id,
                doctorId: doctor.doctorId,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                hospitalName: doctor.hospitalName
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login doctor
// @route   POST /api/auth/doctor/login
// @access  Public
exports.doctorLogin = async (req, res, next) => {
    try {
        const { identifier, password } = req.body; // identifier can be email or phoneNumber

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email/phone number and password'
            });
        }

        // Find doctor by email or phoneNumber
        const doctor = await Doctor.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }]
        }).select('+password');

        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(doctor._id, 'doctor');

        res.status(200).json({
            success: true,
            token,
            data: {
                id: doctor._id,
                doctorId: doctor.doctorId,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
                hospitalName: doctor.hospitalName
            }
        });
    } catch (error) {
        next(error);
    }
};
