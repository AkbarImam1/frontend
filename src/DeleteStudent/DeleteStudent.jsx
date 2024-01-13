import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './DeleteStudent.css'; // Import your CSS file

function DeleteStudent() {
  const [rollNoToDelete, setRollNoToDelete] = useState('');

  const handleInputChange = (e) => {
    setRollNoToDelete(e.target.value);
  };

  const handleDelete = () => {
    if (!rollNoToDelete) {
      console.error('Roll Number is required for deleting a student.');
      return;
    }

    axios.delete(`http://localhost:5000/api/students/${rollNoToDelete}`)
      .then(response => {
        console.log('Student deleted:', response.data);
        // Optionally, you can perform any additional actions after deletion.
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div className="delete-student-container">
      <h1>Delete Student</h1>
      <TextField
        label="Roll Number"
        type="text"
        value={rollNoToDelete}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Student
      </Button>
    </div>
  );
}

export default DeleteStudent;
