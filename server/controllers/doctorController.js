const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Visit = require('../models/Visit');
const ScanReport = require('../models/ScanReport');
const Query = require('../models/Query');
const Appointment = require('../models/Appointment');
const Invoice = require('../models/Invoice');
const { generateVisitId, generateReportId } = require('../utils/generateId');

// @desc    Get doctor profile
// @route   GET /api/doctor/profile
// @access  Private (Doctor)
exports.getProfile = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.doctor._id);

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search patient by OPID or name
// @route   GET /api/doctor/patients/search
// @access  Private (Doctor)
exports.searchPatient = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Please provide search query'
            });
        }

        // Search by patient ID or name (case-insensitive)
        const patients = await Patient.find({
            $or: [
                { patientId: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } }
            ]
        }).select('-password');

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add new patient visit
// @route   POST /api/doctor/visits
// @access  Private (Doctor)
exports.addVisit = async (req, res, next) => {
    try {
        const {
            patientId,
            diagnosis,
            tablets,
            tabletTimings,
            foodInstructions,
            bloodPressure,
            spo2,
            heartRate
        } = req.body;

        // Verify patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Generate unique visit ID
        let visitId;
        let isUnique = false;
        while (!isUnique) {
            visitId = generateVisitId();
            const existing = await Visit.findOne({ visitId });
            if (!existing) isUnique = true;
        }

        const doctor = await Doctor.findById(req.doctor._id);

        const visit = await Visit.create({
            visitId,
            patientId,
            doctorId: req.doctor._id,
            doctorName: doctor.name,
            hospitalName: doctor.hospitalName,
            visitDate: new Date(),
            diagnosis,
            tablets: tablets || [],
            tabletTimings,
            foodInstructions,
            bloodPressure,
            spo2,
            heartRate
        });

        res.status(201).json({
            success: true,
            data: visit
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload scan reports for a visit
// @route   POST /api/doctor/visits/:visitId/scans
// @access  Private (Doctor)
exports.uploadScanReports = async (req, res, next) => {
    try {
        const visit = await Visit.findById(req.params.visitId);

        if (!visit) {
            return res.status(404).json({
                success: false,
                message: 'Visit not found'
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one file'
            });
        }

        const scanReports = [];

        for (const file of req.files) {
            // Generate unique report ID
            let reportId;
            let isUnique = false;
            while (!isUnique) {
                reportId = generateReportId();
                const existing = await ScanReport.findOne({ reportId });
                if (!existing) isUnique = true;
            }

            const fileType = file.mimetype.startsWith('image/') ? 'image' : 'pdf';

            const scanReport = await ScanReport.create({
                reportId,
                visitId: visit._id,
                patientId: visit.patientId,
                fileName: file.originalname,
                fileUrl: `uploads/${file.filename}`,
                fileType,
                uploadedBy: req.doctor._id
            });

            scanReports.push(scanReport);
        }

        res.status(201).json({
            success: true,
            count: scanReports.length,
            data: scanReports
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all patients visited by doctor
// @route   GET /api/doctor/patients
// @access  Private (Doctor)
exports.getAllPatients = async (req, res, next) => {
    try {
        // Get all unique patient IDs from visits
        const visits = await Visit.find({ doctorId: req.doctor._id })
            .distinct('patientId');

        const patients = await Patient.find({ _id: { $in: visits } })
            .select('-password');

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient statistics
// @route   GET /api/doctor/stats
// @access  Private (Doctor)
exports.getStats = async (req, res, next) => {
    try {
        const totalVisits = await Visit.countDocuments({ doctorId: req.doctor._id });
        const uniquePatients = await Visit.find({ doctorId: req.doctor._id })
            .distinct('patientId');
        const totalPatients = uniquePatients.length;

        const pendingQueries = await Query.countDocuments({
            doctorId: req.doctor._id,
            status: 'pending'
        });

        res.status(200).json({
            success: true,
            data: {
                totalPatients,
                totalVisits,
                pendingQueries
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient visit history
// @route   GET /api/doctor/patients/:patientId/visits
// @access  Private (Doctor)
exports.getPatientVisits = async (req, res, next) => {
    try {
        const visits = await Visit.find({
            patientId: req.params.patientId,
            doctorId: req.doctor._id
        }).sort({ visitDate: -1 });

        const patient = await Patient.findById(req.params.patientId)
            .select('-password');

        res.status(200).json({
            success: true,
            data: {
                patient,
                visits,
                count: visits.length
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient queries
// @route   GET /api/doctor/queries
// @access  Private (Doctor)
exports.getQueries = async (req, res, next) => {
    try {
        const { status } = req.query;

        const filter = { doctorId: req.doctor._id };
        if (status) {
            filter.status = status;
        }

        const queries = await Query.find(filter)
            .populate('patientId', 'name patientId mobileNumber')
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

// @desc    Reply to patient query
// @route   PUT /api/doctor/queries/:queryId
// @access  Private (Doctor)
exports.replyToQuery = async (req, res, next) => {
    try {
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an answer'
            });
        }

        const query = await Query.findOne({
            _id: req.params.queryId,
            doctorId: req.doctor._id
        });

        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        query.answer = answer;
        query.status = 'answered';
        query.answeredAt = new Date();

        await query.save();

        res.status(200).json({
            success: true,
            data: query
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get doctor's appointments
// @route   GET /api/doctor/appointments
// @access  Private (Doctor)
exports.getAppointments = async (req, res, next) => {
    try {
        const { status, limit = 10 } = req.query;

        const filter = { doctorId: req.doctor._id };
        if (status) {
            filter.status = status;
        }

        const appointments = await Appointment.find(filter)
            .populate('patientId', 'name patientId age bloodGroup profileImage')
            .sort({ appointmentDate: -1 })
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get upcoming appointment
// @route   GET /api/doctor/appointments/upcoming
// @access  Private (Doctor)
exports.getUpcomingAppointment = async (req, res, next) => {
    try {
        const now = new Date();

        const appointment = await Appointment.findOne({
            doctorId: req.doctor._id,
            appointmentDate: { $gte: now },
            status: { $in: ['pending', 'confirmed'] }
        })
            .populate('patientId', 'name patientId profileImage')
            .sort({ appointmentDate: 1 });

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get doctor's invoices
// @route   GET /api/doctor/invoices
// @access  Private (Doctor)
exports.getInvoices = async (req, res, next) => {
    try {
        const { status = 'paid', limit = 5 } = req.query;

        const filter = { doctorId: req.doctor._id };
        if (status) {
            filter.status = status;
        }

        const invoices = await Invoice.find(filter)
            .populate('patientId', 'name patientId profileImage')
            .sort({ paidOn: -1, createdAt: -1 })
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: invoices.length,
            data: invoices
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get weekly analytics
// @route   GET /api/doctor/analytics/weekly
// @access  Private (Doctor)
exports.getWeeklyAnalytics = async (req, res, next) => {
    try {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 6); // Last 7 days
        startOfWeek.setHours(0, 0, 0, 0);

        // Get appointments for the week
        const appointments = await Appointment.find({
            doctorId: req.doctor._id,
            appointmentDate: { $gte: startOfWeek }
        });

        // Get invoices for the week
        const invoices = await Invoice.find({
            doctorId: req.doctor._id,
            paidOn: { $gte: startOfWeek },
            status: 'paid'
        });

        // Group by day
        const weekData = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dayStart = new Date(date.setHours(0, 0, 0, 0));
            const dayEnd = new Date(date.setHours(23, 59, 59, 999));

            const dayAppointments = appointments.filter(apt => {
                const aptDate = new Date(apt.appointmentDate);
                return aptDate >= dayStart && aptDate <= dayEnd;
            });

            const dayInvoices = invoices.filter(inv => {
                const invDate = new Date(inv.paidOn);
                return invDate >= dayStart && invDate <= dayEnd;
            });

            const revenue = dayInvoices.reduce((sum, inv) => sum + inv.amount, 0);

            weekData.push({
                day: days[date.getDay()].charAt(0), // First letter of day
                appointments: dayAppointments.length,
                revenue: Math.round(revenue / 10) // Normalize for chart display
            });
        }

        res.status(200).json({
            success: true,
            data: weekData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update profile
// @route   PUT /api/doctor/profile
// @access  Private (Doctor)
exports.updateProfile = async (req, res, next) => {
    try {
        const updates = req.body;
        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        next(error);
    }
};

// ==================== SCHEDULE MANAGEMENT ====================

// @desc    Get doctor's schedule
// @route   GET /api/doctor/schedule
// @access  Private (Doctor)
exports.getSchedule = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.doctor._id);

        res.status(200).json({
            success: true,
            data: {
                schedule: doctor.schedule,
                appointmentFee: doctor.appointmentFee
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update doctor's schedule
// @route   PUT /api/doctor/schedule
// @access  Private (Doctor)
exports.updateSchedule = async (req, res, next) => {
    try {
        const { schedule, appointmentFee } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            { schedule, appointmentFee },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Schedule updated successfully',
            data: {
                schedule: doctor.schedule,
                appointmentFee: doctor.appointmentFee
            }
        });
    } catch (error) {
        next(error);
    }
};

// ==================== REVIEWS ====================

const Review = require('../models/Review');

// @desc    Get all reviews for doctor
// @route   GET /api/doctor/reviews
// @access  Private (Doctor)
exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ doctorId: req.doctor.doctorId })
            .sort({ createdAt: -1 });

        // Calculate average rating
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

        res.status(200).json({
            success: true,
            count: reviews.length,
            averageRating: avgRating.toFixed(1),
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reply to a review
// @route   PUT /api/doctor/reviews/:id/reply
// @access  Private (Doctor)
exports.replyToReview = async (req, res, next) => {
    try {
        const { reply } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { reply },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reply added successfully',
            data: review
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark review as helpful
// @route   PUT /api/doctor/reviews/:id/helpful
// @access  Private (Doctor)
exports.markReviewHelpful = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        next(error);
    }
};

// ==================== ACCOUNTS & PAYOUTS ====================

const Payout = require('../models/Payout');

// @desc    Get account statistics
// @route   GET /api/doctor/accounts/stats
// @access  Private (Doctor)
exports.getAccountStats = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.doctor._id);

        res.status(200).json({
            success: true,
            data: {
                totalBalance: doctor.totalBalance || 0,
                totalEarned: doctor.totalEarned || 0,
                totalRequested: doctor.totalRequested || 0,
                bankDetails: doctor.bankDetails,
                payoutMethod: doctor.payoutMethod
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get payout transactions
// @route   GET /api/doctor/payouts
// @access  Private (Doctor)
exports.getPayouts = async (req, res, next) => {
    try {
        const payouts = await Payout.find({ doctorId: req.doctor.doctorId })
            .sort({ requestedDate: -1 });

        res.status(200).json({
            success: true,
            count: payouts.length,
            data: payouts
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Request payment
// @route   POST /api/doctor/accounts/request-payment
// @access  Private (Doctor)
exports.requestPayment = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.doctor._id);

        if (doctor.totalBalance <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance'
            });
        }

        const payout = await Payout.create({
            doctorId: doctor.doctorId,
            amount: doctor.totalBalance,
            method: doctor.payoutMethod === 'stripe' ? 'Stripe' : 'Paypal',
            accountNumber: doctor.bankDetails.accountNumber || 'Not Set',
            status: 'Pending'
        });

        // Update doctor's balance
        doctor.totalRequested += doctor.totalBalance;
        doctor.totalBalance = 0;
        await doctor.save();

        res.status(201).json({
            success: true,
            message: 'Payment request submitted successfully',
            data: payout
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update bank details
// @route   PUT /api/doctor/accounts/bank-details
// @access  Private (Doctor)
exports.updateBankDetails = async (req, res, next) => {
    try {
        const { bankName, accountNumber, branchName, accountName } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            {
                bankDetails: {
                    bankName,
                    accountNumber,
                    branchName,
                    accountName
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Bank details updated successfully',
            data: doctor.bankDetails
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update payout method
// @route   PUT /api/doctor/payout-method
// @access  Private (Doctor)
exports.updatePayoutMethod = async (req, res, next) => {
    try {
        const { method } = req.body;

        if (!['stripe', 'paypal'].includes(method)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payout method'
            });
        }

        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            { payoutMethod: method },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Payout method updated successfully',
            data: { payoutMethod: doctor.payoutMethod }
        });
    } catch (error) {
        next(error);
    }
};

// ==================== MESSAGES ====================

const Message = require('../models/Message');

// @desc    Get all conversations
// @route   GET /api/doctor/conversations
// @access  Private (Doctor)
exports.getConversations = async (req, res, next) => {
    try {
        // Get unique conversations
        const messages = await Message.find({
            $or: [
                { senderId: req.doctor.doctorId },
                { receiverId: req.doctor.doctorId }
            ]
        }).sort({ createdAt: -1 });

        // Group by conversation and get latest message
        const conversationsMap = new Map();

        messages.forEach(msg => {
            if (!conversationsMap.has(msg.conversationId)) {
                conversationsMap.set(msg.conversationId, msg);
            }
        });

        const conversations = Array.from(conversationsMap.values());

        res.status(200).json({
            success: true,
            count: conversations.length,
            data: conversations
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get messages in a conversation
// @route   GET /api/doctor/conversations/:conversationId/messages
// @access  Private (Doctor)
exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Send a message
// @route   POST /api/doctor/conversations/:conversationId/messages
// @access  Private (Doctor)
exports.sendMessage = async (req, res, next) => {
    try {
        const { receiverId, message } = req.body;
        const doctor = await Doctor.findById(req.doctor._id);

        const newMessage = await Message.create({
            conversationId: req.params.conversationId,
            senderId: req.doctor.doctorId,
            senderType: 'doctor',
            senderName: doctor.name,
            senderImage: doctor.profileImage,
            receiverId,
            message
        });

        res.status(201).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark message as read
// @route   PUT /api/doctor/messages/:id/read
// @access  Private (Doctor)
exports.markMessageAsRead = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        next(error);
    }
};

// ==================== SOCIAL MEDIA & SERVICES ====================

// @desc    Update social media links
// @route   PUT /api/doctor/social-media
// @access  Private (Doctor)
exports.updateSocialMedia = async (req, res, next) => {
    try {
        const { socialMedia } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            { socialMedia },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Social media links updated successfully',
            data: doctor.socialMedia
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update services
// @route   PUT /api/doctor/services
// @access  Private (Doctor)
exports.updateServices = async (req, res, next) => {
    try {
        const { services } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            req.doctor._id,
            { services },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Services updated successfully',
            data: doctor.services
        });
    } catch (error) {
        next(error);
    }
};

// ==================== APPOINTMENT REQUESTS ====================

// @desc    Get appointment requests
// @route   GET /api/doctor/appointments/requests
// @access  Private (Doctor)
exports.getAppointmentRequests = async (req, res, next) => {
    try {
        const requests = await Appointment.find({
            doctorId: req.doctor.doctorId,
            status: 'pending'
        })
            .populate('patientId', 'name email phoneNumber profileImage')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Accept appointment request
// @route   PUT /api/doctor/appointments/requests/:id/accept
// @access  Private (Doctor)
exports.acceptAppointmentRequest = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmed' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment request accepted',
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reject appointment request
// @route   PUT /api/doctor/appointments/requests/:id/reject
// @access  Private (Doctor)
exports.rejectAppointmentRequest = async (req, res, next) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment request rejected',
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment status
// @route   PUT /api/doctor/appointments/:id/status
// @access  Private (Doctor)
exports.updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment status updated',
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

