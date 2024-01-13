import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import './GetAllStudent.css'
const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>
      <List>
        <Paper elevation={3} style={{ marginBottom: '16px' }}>
          <ListItem>
            <ListItemText primary="Name" />
          </ListItem>
          {students.map(student => (
            <ListItem key={student.roll_no}>
              <ListItemText primary={student.name} />
            </ListItem>
          ))}
        </Paper>
        <Paper elevation={3} style={{ marginBottom: '16px' }}>
          <ListItem>
            <ListItemText primary="E-mail" />
          </ListItem>
          {students.map(student => (
            <ListItem key={student.roll_no}>
              <ListItemText primary={student.email} />
            </ListItem>
          ))}
        </Paper>
        <Paper elevation={3}>
          <ListItem>
            <ListItemText primary="Group" />
          </ListItem>
          {students.map(student => (
            <ListItem key={student.roll_no}>
              <ListItemText primary={student.group} />
            </ListItem>
          ))}
        </Paper>
      </List>
    </div>
  );
}

export default StudentList;
