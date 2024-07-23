import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorForm.css'
function DoctorForm() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [clinics, setClinics] = useState([]);
  const [selectedClinics, setSelectedClinics] = useState([]);
  const [errors, setErrors] = useState({});

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
    setErrors({}); // Clear previous errors

    // Basic client-side validation (you can add more rules)
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!age.trim()) newErrors.age = 'Age is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (selectedClinics.length === 0)
      newErrors.clinics = 'Please select at least one clinic';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/doctors/add', {
        name,
        mobile,
        age,
        email,
        clinics: selectedClinics,
      });

      console.log('Doctor registered:', response.data);

      // Reset form fields after successful submission
      setName('');
      setMobile('');
      setAge('');
      setEmail('');
      setSelectedClinics([]);
    } catch (error) {
      console.error('Error registering doctor:', error);
      // Handle errors from backend (e.g., display validation errors)
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleClinicChange = (event) => {
    const selectedClinicIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedClinics(selectedClinicIds);
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
      <div style={{ display: "flex", justifyContent: 'center' }}>
      </div>
       <button style={buttonStyles}>
      <Link to="/doctors" style={linkStyles}>
        Doctor List
      </Link>
    </button>
      <form onSubmit={handleSubmit} className='doctor-form'>

        <h2>Register Doctor</h2>
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
          <label htmlFor="clinics">Clinics:</label>
          <select
            value={selectedClinics}
            onChange={handleClinicChange}
            id="clinics"
          >
            <option value="">Select a Clinic</option>
            {clinics.map((clinic) => (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            ))}
          </select>
          {errors.clinics && (
            <span className="error">{errors.clinics}</span>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default DoctorForm;