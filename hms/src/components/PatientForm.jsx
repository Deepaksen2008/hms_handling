import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PatientForm.css'; // Assuming you have a CSS file

function PatientForm() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(''); // State for selected clinic
  const [UID, setUID] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      // Only fetch if a clinic is selected
      if (selectedClinic) {
        try {
          const response = await axios.get(`http://localhost:8080/doctors/clinic/${selectedClinic}`);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      }
    };

    fetchDoctors();
  }, [selectedClinic]); // Run effect when selectedClinic changes

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctors/clinics');
        setClinics(response.data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    fetchClinics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!age.trim()) newErrors.age = 'Age is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!selectedDoctor) newErrors.doctor = 'Please select a doctor';
    if (!UID.trim()) newErrors.UID = 'UID is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/patient/patientadd', {
        name,
        mobile,
        age,
        email,
        doctor: selectedDoctor, // Send selectedDoctor ID
        clinics: [selectedClinic], // Send selectedClinic ID
        UID,
      });

      console.log('Patient registered:', response.data);

      // Reset form fields
      setName('');
      setMobile('');
      setAge('');
      setEmail('');
      setSelectedDoctor('');
      setSelectedClinic(''); // Reset selected clinic
      setUID('');
    } catch (error) {
      console.error('Error registering patient:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleClinicChange = (event) => {
    setSelectedClinic(event.target.value);
  };

  const buttonStyles = {
    display: 'inline-block', // Allows padding and margin to be applied
    backgroundColor: '#007BFF', // Button background color
    color: '#FFFFFF', // Button text color
    border: 'none', // Removes default border
    padding: '10px 20px', // Padding inside the button
    fontSize: '16px', // Text size
    borderRadius: '5px', // Rounded corners
    textDecoration: 'none', // Removes underline from the link
    textAlign: 'center', // Centers text inside the button
    cursor: 'pointer', // Pointer cursor on hover
    margin: '20px', // Margin around the button
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };

  const linkStyles = {
    color: '#FFFFFF', // Ensures text color is white
    display: 'block', // Ensures the link takes up the full width of the button
    textDecoration: 'none', // Removes underline from the link
  };

  return (
    <>
      <button style={buttonStyles}>
      <Link to="/getpatientreg" style={linkStyles}>
      Patient List
      </Link>
    </button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      </div>
      <form onSubmit={handleSubmit} className="doctor-form">
        <h2>Patient Registration</h2>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="date" // Use "date" type for age
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="clinic">Select Clinic:</label>
          <select id="clinic" value={selectedClinic} onChange={handleClinicChange}>
            <option value="">Select a Clinic</option>
            {clinics.map((clinic) => (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            ))}
          </select>
          {errors.clinics && <span className="error">{errors.clinics}</span>}
        </div>

        <div>
          <label htmlFor="doctor">Select Doctor:</label>
          <select id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctor && <span className="error">{errors.doctor}</span>}
        </div>

        <div>
          <label htmlFor="UID">UID:</label>
          <input
            type="text"
            id="UID"
            value={UID}
            onChange={(e) => setUID(e.target.value)}
          />
          {errors.UID && <span className="error">{errors.UID}</span>}
        </div>

        <button type="submit">Patient Register</button>
      </form>
    </>
  );
}

export default PatientForm;