import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './StudentDetails.css'; // Import your CSS file

function ViewStudentDetails() {
  const [rollNoToView, setRollNoToView] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setRollNoToView(e.target.value);
  };

  const handleViewDetails = () => {
    if (!rollNoToView) {
      setErrorMessage('Roll Number is required for fetching student details.');
      setStudentDetails(null);
      return;
    }

    axios.get(`http://localhost:5000/api/students/${rollNoToView}`)
      .then(response => {
        setStudentDetails(response.data);
        setErrorMessage('');
      })
      .catch(error => {
        setStudentDetails(null);
        setErrorMessage('Student not found');
      });
  };

  return (
    <div className="view-student-details-container">
      <h1>View Student Details</h1>
      <TextField
        label="Enter Roll Number"
        type="text"
        value={rollNoToView}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleViewDetails}>
        View Details
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error" className="error-message">
          {errorMessage}
        </Typography>
      )}
      {studentDetails && (
        <div className="student-details">
          <Typography variant="body1"><strong>Roll Number:</strong> {studentDetails.roll_no}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {studentDetails.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {studentDetails.email}</Typography>
          <Typography variant="body1"><strong>Group:</strong> {studentDetails.group}</Typography>
        </div>
      )}
    </div>
  );
}

export default ViewStudentDetails;
