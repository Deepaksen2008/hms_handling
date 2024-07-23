import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);


  const convertDateFormat = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  const cellStyle = { border: '1px solid black', padding: '8px', textAlign: 'center' };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Doctor List</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto' }}>
          <thead>
            <tr>
              <th style={cellStyle}>Sno</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Mobile</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>DOB</th>
              <th style={cellStyle}>Clinics</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <td style={cellStyle}>
                  <strong>{index + 1}</strong>
                </td>
                <td style={cellStyle}>
                  <strong>{doctor.name}</strong>
                </td>
                <td style={cellStyle}>
                  {doctor.mobile}
                </td>
                <td style={cellStyle}>
                  {doctor.email}
                </td>
                <td style={cellStyle}>
                  {convertDateFormat(doctor.age)}
                </td>
                <td style={cellStyle}>
                  <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                    {doctor.clinics.map((clinic) => (
                      <li key={clinic._id}>{clinic.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DoctorList;