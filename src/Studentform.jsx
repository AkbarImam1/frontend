import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './StudentForm.css'; // Import your CSS file
function StudentForm() {
  const [newStudent, setNewStudent] = useState({
    roll_no: '',
    name: '',
    email: '',
    group: ''
  });

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/students', newStudent)
      .then(response => console.log('New student added:', response.data))
      .catch(error => console.error('Error adding student:', error));
  };

  return (
    <Box className="student-form-container">
      <Typography variant="h4">Add New Student</Typography>
      <form>
        <TextField
          label="Roll Number"
          type="text"
          name="roll_no"
          value={newStudent.roll_no}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Group"
          type="text"
          name="group"
          value={newStudent.group}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Add Student
        </Button>
      </form>
    </Box>
  );
}

export default StudentForm;
