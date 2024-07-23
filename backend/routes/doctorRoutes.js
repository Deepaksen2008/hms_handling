const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Clinic = require('../models/Clinic');

// Get all clinics (for the dropdown)
router.get('/clinics', async (req, res) => {
    try {
        const clinics = await Clinic.find();
        res.json(clinics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/clinics/add', async (req, res) => {
    const clinic = new Clinic({
        name: req.body.name
    });

    try {
        const newClinic = await clinic.save();
        res.status(201).json(newClinic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Register a new doctor
router.post('/add', async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        mobile: req.body.mobile,
        age: req.body.age,
        email: req.body.email,
        clinics: req.body.clinics // Array of clinic IDs
    });

    try {
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all doctors (with populated clinic information)
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('clinics'); 
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get doctors by clinic ID 
router.get('/clinic/:clinicId', async (req, res) => {
    try {
        const doctors = await Doctor.find({ clinics: req.params.clinicId });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;