const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ['Stripe', 'Paypal', 'Bank Transfer'],
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending', 'Cancelled'],
        default: 'Pending'
    },
    accountNumber: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        default: ''
    },
    requestedDate: {
        type: Date,
        default: Date.now
    },
    creditedDate: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for efficient queries
payoutSchema.index({ doctorId: 1, requestedDate: -1 });

module.exports = mongoose.model('Payout', payoutSchema);
