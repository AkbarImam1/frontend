import React from 'react'
import { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classes from './signup.module.css'
import { register } from '../redux/authSlice'
import { request } from '../util/fecthAPI'


const Signup = () => {
  const [state, setState] = useState({})

  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    // how to check if ONLY ONE of the values of an object is empty
    if (Object.values(state).some((v) => v === '')) {
      setEmptyFields(true)
      setTimeout(() => {
        setEmptyFields(false)
      }, 2500)
    }

    try {
      let filename = null
   

      const headers = {
        "Content-Type": "application/json",
      }

      const data = await request(`/auth/register`, "POST", headers, { ...state, profileImg: filename })


      dispatch(register(data))
      navigate("/")
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder='Username...' onChange={handleState} />
          <input type="text" name="email" placeholder='Email...' onChange={handleState} />
          {/* <input style={{ display: 'none' }} id='photo' type="file" onChange={(e) => setPhoto(e.target.files[0])} /> */}
          <input type="password" name="password" placeholder='Password...' onChange={handleState} />
          <button type="submit">Register</button>
          <p>Already have an account? <Link to='/signin'>Login</Link></p>
        </form>
        {error && (
          <div className={classes.error}>
            There was an error signing up! Try again.
          </div>
        )}
        {emptyFields && (
          <div className={classes.error}>
            Fill all fields!
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup