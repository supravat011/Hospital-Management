const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    visitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit'
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
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'refunded'],
        default: 'pending',
        index: true
    },
    paidOn: {
        type: Date
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online', 'insurance', 'other']
    },
    description: {
        type: String
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Index for querying invoices by doctor and status
invoiceSchema.index({ doctorId: 1, status: 1 });
invoiceSchema.index({ patientId: 1, status: 1 });

module.exports = mongoose.model('Invoice', invoiceSchema);
