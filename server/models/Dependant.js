const mongoose = require('mongoose');

const dependantSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Please provide dependant name']
    },
    relation: {
        type: String,
        required: [true, 'Please provide relation'],
        enum: ['Mother', 'Father', 'Spouse', 'Child', 'Sibling', 'Other']
    },
    age: {
        type: Number,
        required: [true, 'Please provide age']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide date of birth']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']
    },
    profileImage: {
        type: String,
        default: ''
    },
    medicalHistory: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Calculate age from date of birth
dependantSchema.virtual('calculatedAge').get(function () {
    if (!this.dateOfBirth) return this.age;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Calculate days since birth for display
dependantSchema.virtual('ageInDays').get(function () {
    if (!this.dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays % 365; // Days in current year
});

dependantSchema.set('toJSON', { virtuals: true });
dependantSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Dependant', dependantSchema);
