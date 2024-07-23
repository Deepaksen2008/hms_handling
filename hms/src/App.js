import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import the BrowserRouter component
import Home from './components/Home'; 
import DoctorForm from './components/DoctorForm';
import ClinicForm from './components/ClinicForm'; // Import the new component
import DoctorList from './components/DoctorList';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/doctorReg" element={<DoctorForm />} />
        <Route path="/patientreg" element={<PatientForm />} />
        <Route path="/getpatientreg" element={<PatientList />} />
        <Route path="/clinics" element={<ClinicForm />} />
        <Route path="/doctors" element={<DoctorList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
