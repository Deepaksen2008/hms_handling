const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String, 
        required: true,
        unique: true // Ensure mobile numbers are unique
    },
    age: { 
        type: Date, // Store age as a date for easy calculations
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true // Ensure emails are unique
    },
    clinics: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Clinic' 
    }]
});

module.exports = mongoose.model('Doctor', doctorSchema);