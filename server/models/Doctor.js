const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Please provide doctor name']
    },
    age: {
        type: Number,
        required: [true, 'Please provide age']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        index: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    medicalLicenseNumber: {
        type: String,
        required: [true, 'Please provide medical license number'],
        unique: true
    },
    specialization: {
        type: String,
        required: [true, 'Please provide specialization']
    },
    hospitalName: {
        type: String,
        required: [true, 'Please provide hospital name']
    },
    hospitalAddress: {
        type: String,
        required: [true, 'Please provide hospital address']
    },
    profileImage: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    services: {
        type: [String],
        default: []
    },
    socialMedia: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    schedule: {
        general: {
            monday: { type: [{ start: String, end: String }], default: [] },
            tuesday: { type: [{ start: String, end: String }], default: [] },
            wednesday: { type: [{ start: String, end: String }], default: [] },
            thursday: { type: [{ start: String, end: String }], default: [] },
            friday: { type: [{ start: String, end: String }], default: [] },
            saturday: { type: [{ start: String, end: String }], default: [] },
            sunday: { type: [{ start: String, end: String }], default: [] }
        },
        clinic: {
            monday: { type: [{ start: String, end: String }], default: [] },
            tuesday: { type: [{ start: String, end: String }], default: [] },
            wednesday: { type: [{ start: String, end: String }], default: [] },
            thursday: { type: [{ start: String, end: String }], default: [] },
            friday: { type: [{ start: String, end: String }], default: [] },
            saturday: { type: [{ start: String, end: String }], default: [] },
            sunday: { type: [{ start: String, end: String }], default: [] }
        }
    },
    appointmentFee: {
        type: Number,
        default: 0
    },
    bankDetails: {
        bankName: { type: String, default: '' },
        accountNumber: { type: String, default: '' },
        branchName: { type: String, default: '' },
        accountName: { type: String, default: '' }
    },
    payoutMethod: {
        type: String,
        enum: ['stripe', 'paypal'],
        default: 'paypal'
    },
    totalBalance: {
        type: Number,
        default: 0
    },
    totalEarned: {
        type: Number,
        default: 0
    },
    totalRequested: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Hash password before saving
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
doctorSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);
