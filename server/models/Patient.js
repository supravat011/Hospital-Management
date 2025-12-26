const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Please provide patient name']
    },
    age: {
        type: Number,
        required: [true, 'Please provide age']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Please provide blood group'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    height: {
        type: Number,
        required: [true, 'Please provide height in cm']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide weight in kg']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please provide mobile number'],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    biometrics: {
        type: String,
        default: 'future/simulated'
    },
    profileImage: {
        type: String,
        default: ''
    },
    favouriteDoctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }]
}, {
    timestamps: true
});

// Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
patientSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Patient', patientSchema);
