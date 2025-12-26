const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        index: true
    },
    patientId: {
        type: String,
        required: true,
        index: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientImage: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        default: ''
    },
    helpful: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for efficient queries
reviewSchema.index({ doctorId: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
