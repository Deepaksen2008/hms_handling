import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');

  useEffect(() => {
    const filterPatients = async () => {
      if (selectedClinic && selectedDoctor) {
        try {
          const response = await axios.get(`http://localhost:8080/patient/getpatient/${selectedClinic}/${selectedDoctor}`);
          setPatients(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      }
    };

    filterPatients();
  }, [selectedClinic, selectedDoctor]);


  useEffect(() => {
    const fetchDoctors = async () => {
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
  }, [selectedClinic]);

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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/patient/getpatient');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);
  
  const convertDateFormat = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const mobileMatch = patient.mobile.includes(searchTerm);
    return nameMatch || mobileMatch;
  });

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleClinicChange = (event) => {
    setSelectedClinic(event.target.value);
  }

    const cellStyle = { border: '1px solid black', padding: '8px', textAlign: 'center' };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>Patient List</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{marginLeft:'20px'}}>
            <input
              type="text"
              placeholder="Search by name or mobile"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex',marginRight:'20px' }}>
            <div style={{ marginRight: '10px' }}>
              <select id="clinic" value={selectedClinic} onChange={handleClinicChange}>
                <option value="">Select by Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Select by Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
              <th style={cellStyle}>Sno</th>
                <th style={cellStyle}>UID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Mobile</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>DOB</th>
                <th style={cellStyle}>Clinics</th>
                <th style={cellStyle}>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient._id}>
                <td style={cellStyle}>
                    <strong>{index+1}</strong>
                  </td>
                  <td style={cellStyle}>
                    <strong>{patient.UID}</strong>
                  </td>
                  <td style={cellStyle}>
                    <strong>{patient.name}</strong>
                  </td>
                  <td style={cellStyle}>
                    {patient.mobile}
                  </td>
                  <td style={cellStyle}>
                    {patient.email}
                  </td>
                  <td style={cellStyle}>
                    {convertDateFormat(patient.age)}
                  </td>
                  <td style={cellStyle}>
                    <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                      {patient.clinics.map((clinic) => (
                        <li key={clinic._id}>{clinic.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={cellStyle}>
                    {patient.doctor ? patient.doctor.name : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };


export default PatientList;
