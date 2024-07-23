const express = require('express');
const router1 = express.Router();
const Patient = require('../models/Patient'); // Assuming you have a Patient model
const Clinic = require('../models/Clinic'); // Assuming you have a Clinic model
const Doctor = require('../models/Doctor'); // Assuming you have a Doctor model

// Route to add a new patient
router1.post('/patientadd', async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.body.clinics[0]);
    const doctor = await Doctor.findById(req.body.doctor);

    // Check if a valid clinic and doctor were found
    if (!clinic || !doctor) {
      return res.status(400).json({ message: 'Invalid clinic or doctor ID' });
    }

    // Create a new patient instance with the fetched clinic and doctor IDs
    const patient = new Patient({
      name: req.body.name,
      mobile: req.body.mobile,
      age: req.body.age,
      email: req.body.email,
      clinics: [clinic._id], 
      UID: req.body.UID,
      doctor: doctor._id,     
    });

    // Save the new patient to the database
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    // Handle any errors during the process
    res.status(400).json({ message: err.message });
  }
});

// Route to get all patients with populated clinic and doctor data
router1.get('/getpatient', async (req, res) => {
  try {
    // Fetch all patients and populate the 'clinics' and 'doctor' fields
    const patients = await Patient.find().populate('clinics doctor');
    res.json(patients);
  } catch (err) {
    // Handle any errors during the process
    res.status(500).json({ message: err.message });
  }
});

// Get patients by clinicId and doctorId
router1.get('/getpatient/:clinicId/:doctorId', async (req, res) => {
  try {
    const { clinicId, doctorId } = req.params;
    // console.log(clinicId, doctorId);
    // Fetch patients based on clinicId and doctorId
    const patients = await Patient.find({
      clinics: clinicId,
      doctor: doctorId
    }).populate('clinics doctor');

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router to be used in your application
module.exports = router1;