import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, AppBar, Toolbar, Typography, List, ListItem } from '@mui/material';
import StudentForm from './Studentform';
import StudentDetail from './StudentDetails/StudentDetails';
import EditStudent from './EditStudent/EditStudent';
import DeleteStudent from './DeleteStudent/DeleteStudent';
import GetAllStudent from './GetAllStudent/GetAllStudent';

const Home = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Student App</Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <Button component={Link} to="/getAllStudent" variant="contained" color="primary">
            Get All Students
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/add" variant="contained" color="primary">
            Add Student
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/edit" variant="contained" color="primary">
            Edit Student
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/delete" variant="contained" color="primary">
            Delete Student
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/detail" variant="contained" color="primary">
            Student Details
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getAllStudent" element={<GetAllStudent />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit" element={<EditStudent />} />
          <Route path="/delete" element={<DeleteStudent />} />
          <Route path="/detail" element={<StudentDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
