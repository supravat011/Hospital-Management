const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    visitId: {
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
    doctorName: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: [true, 'Please provide diagnosis']
    },
    tablets: [{
        type: String
    }],
    tabletTimings: {
        type: String
    },
    foodInstructions: {
        type: String
    },
    bloodPressure: {
        type: String
    },
    spo2: {
        type: Number,
        min: 0,
        max: 100
    },
    heartRate: {
        type: Number,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);
