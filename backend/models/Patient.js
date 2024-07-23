const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String, 
        required: true,
        unique: true 
    },
    age: { 
        type: Date, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    clinics: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Clinic',
        required: true  
    }],
    UID: { 
        type: String, 
        required: true,
        unique: true
    },
     doctor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', 
        required: true 
    }
});

module.exports = mongoose.model('Patient', patientSchema);