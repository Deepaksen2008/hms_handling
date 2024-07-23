const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Clinic', clinicSchema);