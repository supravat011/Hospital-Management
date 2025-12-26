const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    queryId: {
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
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit'
    },
    question: {
        type: String,
        required: [true, 'Please provide a question']
    },
    answer: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'answered'],
        default: 'pending'
    },
    askedAt: {
        type: Date,
        default: Date.now
    },
    answeredAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Query', querySchema);
