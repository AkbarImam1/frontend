import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router for routing

import './EditStudent.css'; // Import your CSS file

function EditStudent() {
  const { roll_no } = useParams(); // Extract roll_no from the URL params
  const [student, setStudent] = useState({
    roll_no: '',
    name: '',
    email: '',
    group: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${roll_no}`)
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching student details:', error));
  }, [roll_no]);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Make sure roll_no is provided before sending the update request
    if (!student.roll_no) {
      console.error('Roll Number is required for updating student details.');
      return;
    }

    axios.put(`http://localhost:5000/api/students/${student.roll_no}`, student)
      .then(response => {
        console.log('Student updated:', response.data);
       
      })
      .catch(error => console.error('Error updating student:', error));
  };

  return (
    <div className="edit-student-container">
      <h1>Edit Student Details</h1>
      <TextField
        label="Roll Number"
        type="text"
        name="roll_no"
        value={student.roll_no}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        type="text"
        name="name"
        value={student.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="text"
        name="email"
        value={student.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Group"
        type="text"
        name="group"
        value={student.group}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Student
      </Button>
    </div>
  );
}

export default EditStudent;
