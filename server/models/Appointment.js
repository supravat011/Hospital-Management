const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        index: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        index: true
    },
    appointmentDate: {
        type: Date,
        required: true,
        index: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    type: {
        type: String,
        enum: ['General', 'Clinic Consulting', 'Video Consultation', 'Follow-up', 'Emergency'],
        default: 'General'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
        default: 'pending',
        index: true
    },
    reason: {
        type: String
    },
    notes: {
        type: String
    },
    isVideoCall: {
        type: Boolean,
        default: false
    },
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit'
    }
}, {
    timestamps: true
});

// Index for querying appointments by doctor and date
appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ patientId: 1, appointmentDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
