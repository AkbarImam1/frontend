import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, AppBar, Toolbar, Typography, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import {  Navigate, useLocation ,useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react';
import StudentForm from './Studentform';
import StudentDetail from './StudentDetails/StudentDetails';
import EditStudent from './EditStudent/EditStudent';
import DeleteStudent from './DeleteStudent/DeleteStudent';
import GetAllStudent from './GetAllStudent/GetAllStudent';
import Signin from './signin/Signin';
import Signup from './signup/Signup';
import { logout } from './redux/authSlice'
import {request} from './util/fecthAPI'
const Home = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, token } = useSelector((state) => state.auth)
    const [error, setError] = useState(false)
  const handleDeleteProfile = async () => {
    try {
        const options = {
            Authorization: `Bearer ${token}`
        }
        // await request(`/auth/login`, 'POST', options)
        dispatch(logout())
        navigate('/signin')
    } catch (error) {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2500)
    }
}
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
          <Button  variant="contained" color="primary" onClick={handleDeleteProfile}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

const App = () => {
  const { user } = useSelector((state) => state.auth)
  const url = useLocation().pathname
  useEffect(() => {
    url && window.scrollTo(0, 0)
  }, [url])

  return (
    <div>
      {/* <Router> */}
     
        <Routes>
        <Route path='/' element={!user ? <Signup /> : <Home to='/' />} />
        <Route path='/signin' element={!user ? <Signin /> : <Home to='/' />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/getAllStudent" element={<GetAllStudent />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/edit" element={<EditStudent />} />
          <Route path="/delete" element={<DeleteStudent />} />
          <Route path="/detail" element={<StudentDetail />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
};

export default App;
