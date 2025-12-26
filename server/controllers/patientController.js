const Patient = require('../models/Patient');
const Visit = require('../models/Visit');
const ScanReport = require('../models/ScanReport');
const Query = require('../models/Query');
const Notification = require('../models/Notification');
const Dependant = require('../models/Dependant');
const { generateVisitPDF } = require('../utils/pdfGenerator');
const { generateQueryId } = require('../utils/generateId');
const path = require('path');

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private (Patient)
exports.getProfile = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.patient._id);

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update patient profile
// @route   PUT /api/patient/profile
// @access  Private (Patient)
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, age, bloodGroup, height, weight, profileImage } = req.body;

        const patient = await Patient.findById(req.patient._id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Update fields if provided
        if (name) patient.name = name;
        if (age) patient.age = age;
        if (bloodGroup) patient.bloodGroup = bloodGroup;
        if (height) patient.height = height;
        if (weight) patient.weight = weight;
        if (profileImage !== undefined) patient.profileImage = profileImage;

        await patient.save();

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient visit history
// @route   GET /api/patient/visits
// @access  Private (Patient)
exports.getVisitHistory = async (req, res, next) => {
    try {
        const visits = await Visit.find({ patientId: req.patient._id })
            .populate('doctorId', 'name specialization')
            .sort({ visitDate: -1 });

        res.status(200).json({
            success: true,
            count: visits.length,
            data: visits
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get specific visit details
// @route   GET /api/patient/visits/:visitId
// @access  Private (Patient)
exports.getVisitDetails = async (req, res, next) => {
    try {
        const visit = await Visit.findOne({
            _id: req.params.visitId,
            patientId: req.patient._id
        }).populate('doctorId', 'name specialization phoneNumber email');

        if (!visit) {
            return res.status(404).json({
                success: false,
                message: 'Visit not found'
            });
        }

        // Get scan reports for this visit
        const scans = await ScanReport.find({ visitId: visit._id });

        res.status(200).json({
            success: true,
            data: {
                visit,
                scans
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Download visit summary as PDF
// @route   GET /api/patient/visits/:visitId/pdf
// @access  Private (Patient)
exports.downloadVisitPDF = async (req, res, next) => {
    try {
        const visit = await Visit.findOne({
            _id: req.params.visitId,
            patientId: req.patient._id
        });

        if (!visit) {
            return res.status(404).json({
                success: false,
                message: 'Visit not found'
            });
        }

        const patient = await Patient.findById(req.patient._id);
        const pdfPath = await generateVisitPDF(visit, patient);

        res.download(pdfPath, `visit-${visit.visitId}.pdf`, (err) => {
            if (err) {
                next(err);
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get scan reports for a visit
// @route   GET /api/patient/visits/:visitId/scans
// @access  Private (Patient)
exports.getVisitScans = async (req, res, next) => {
    try {
        const scans = await ScanReport.find({
            visitId: req.params.visitId,
            patientId: req.patient._id
        });

        res.status(200).json({
            success: true,
            count: scans.length,
            data: scans
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Download specific scan report
// @route   GET /api/patient/scans/:scanId/download
// @access  Private (Patient)
exports.downloadScan = async (req, res, next) => {
    try {
        const scan = await ScanReport.findOne({
            _id: req.params.scanId,
            patientId: req.patient._id
        });

        if (!scan) {
            return res.status(404).json({
                success: false,
                message: 'Scan report not found'
            });
        }

        const filePath = path.join(__dirname, '..', scan.fileUrl);
        res.download(filePath, scan.fileName);
    } catch (error) {
        next(error);
    }
};

// @desc    Send query to doctor
// @route   POST /api/patient/queries
// @access  Private (Patient)
exports.sendQuery = async (req, res, next) => {
    try {
        const { doctorId, visitId, question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a question'
            });
        }

        // Generate unique query ID
        let queryId;
        let isUnique = false;
        while (!isUnique) {
            queryId = generateQueryId();
            const existing = await Query.findOne({ queryId });
            if (!existing) isUnique = true;
        }

        const query = await Query.create({
            queryId,
            patientId: req.patient._id,
            doctorId,
            visitId: visitId || undefined,
            question
        });

        res.status(201).json({
            success: true,
            data: query
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all queries and replies
// @route   GET /api/patient/queries
// @access  Private (Patient)
exports.getQueries = async (req, res, next) => {
    try {
        const queries = await Query.find({ patientId: req.patient._id })
            .populate('doctorId', 'name specialization')
            .populate('visitId', 'visitDate diagnosis')
            .sort({ askedAt: -1 });

        res.status(200).json({
            success: true,
            count: queries.length,
            data: queries
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient notifications
// @route   GET /api/patient/notifications
// @access  Private (Patient)
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ patientId: req.patient._id })
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark notification as read
// @route   PUT /api/patient/notifications/:id/read
// @access  Private (Patient)
exports.markNotificationRead = async (req, res, next) => {
    try {
        const notification = await Notification.findOne({
            _id: req.params.id,
            patientId: req.patient._id
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient dependants
// @route   GET /api/patient/dependants
// @access  Private (Patient)
exports.getDependants = async (req, res, next) => {
    try {
        const dependants = await Dependant.find({ patientId: req.patient._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: dependants.length,
            data: dependants
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add new dependant
// @route   POST /api/patient/dependants
// @access  Private (Patient)
exports.addDependant = async (req, res, next) => {
    try {
        const { name, relation, age, dateOfBirth, bloodGroup, profileImage, medicalHistory } = req.body;

        const dependant = await Dependant.create({
            patientId: req.patient._id,
            name,
            relation,
            age,
            dateOfBirth,
            bloodGroup,
            profileImage,
            medicalHistory
        });

        res.status(201).json({
            success: true,
            data: dependant
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update dependant
// @route   PUT /api/patient/dependants/:id
// @access  Private (Patient)
exports.updateDependant = async (req, res, next) => {
    try {
        const dependant = await Dependant.findOne({
            _id: req.params.id,
            patientId: req.patient._id
        });

        if (!dependant) {
            return res.status(404).json({
                success: false,
                message: 'Dependant not found'
            });
        }

        const { name, relation, age, dateOfBirth, bloodGroup, profileImage, medicalHistory } = req.body;

        if (name) dependant.name = name;
        if (relation) dependant.relation = relation;
        if (age) dependant.age = age;
        if (dateOfBirth) dependant.dateOfBirth = dateOfBirth;
        if (bloodGroup !== undefined) dependant.bloodGroup = bloodGroup;
        if (profileImage !== undefined) dependant.profileImage = profileImage;
        if (medicalHistory !== undefined) dependant.medicalHistory = medicalHistory;

        await dependant.save();

        res.status(200).json({
            success: true,
            data: dependant
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete dependant
// @route   DELETE /api/patient/dependants/:id
// @access  Private (Patient)
exports.deleteDependant = async (req, res, next) => {
    try {
        const dependant = await Dependant.findOne({
            _id: req.params.id,
            patientId: req.patient._id
        });

        if (!dependant) {
            return res.status(404).json({
                success: false,
                message: 'Dependant not found'
            });
        }

        await dependant.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get favourite doctors
// @route   GET /api/patient/favourites
// @access  Private (Patient)
exports.getFavourites = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.patient._id)
            .populate('favouriteDoctors', 'name specialization email phoneNumber');

        res.status(200).json({
            success: true,
            count: patient.favouriteDoctors.length,
            data: patient.favouriteDoctors
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add doctor to favourites
// @route   POST /api/patient/favourites/:doctorId
// @access  Private (Patient)
exports.addFavourite = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.patient._id);

        if (patient.favouriteDoctors.includes(req.params.doctorId)) {
            return res.status(400).json({
                success: false,
                message: 'Doctor already in favourites'
            });
        }

        patient.favouriteDoctors.push(req.params.doctorId);
        await patient.save();

        res.status(200).json({
            success: true,
            data: patient.favouriteDoctors
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove doctor from favourites
// @route   DELETE /api/patient/favourites/:doctorId
// @access  Private (Patient)
exports.removeFavourite = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.patient._id);

        patient.favouriteDoctors = patient.favouriteDoctors.filter(
            id => id.toString() !== req.params.doctorId
        );

        await patient.save();

        res.status(200).json({
            success: true,
            data: patient.favouriteDoctors
        });
    } catch (error) {
        next(error);
    }
};
