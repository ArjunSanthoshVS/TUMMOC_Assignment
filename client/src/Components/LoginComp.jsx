import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Redux/Slice/UserSlice';
import Google from './Google';

function LoginComp() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ data, navigate }))
  };

  return (
    <>
      <div className="container mt-5 w-50">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={data.email}
              className='form-control'
            />
          </div>
          <div className="mb-3">
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={data.password}
              className='form-control'
            />
          </div>

          <button type='submit' className='mb-3 btn btn-primary'>
            Sign In
          </button>
        </form>
        <Google />
        <Link to={'/signup'}>
          <div className="d-flex justify-content-center mt-3">
            <button type='button' className='btn btn-secondary'>
              SignUp
            </button>
          </div>
        </Link>
      </div>
    </>
  )
}

export default LoginComp
