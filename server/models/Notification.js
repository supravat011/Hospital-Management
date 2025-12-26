const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['booking', 'review', 'appointment', 'payment', 'general'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'bell'
    },
    read: {
        type: Boolean,
        default: false
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Index for efficient queries
notificationSchema.index({ patientId: 1, createdAt: -1 });
notificationSchema.index({ patientId: 1, read: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
