import React, { useState } from 'react';
import axios from 'axios';

function ClinicForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/doctors/clinics/add', { name });
      console.log('Clinic created:', response.data);
      setName('');
    } catch (error) {
      console.error('Error creating clinic:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Clinic</h2>
      <div>
        <label htmlFor="clinicName">Clinic Name:</label>
        <input
          type="text"
          id="clinicName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit">Add Clinic</button>
    </form>
  );
}

export default ClinicForm;