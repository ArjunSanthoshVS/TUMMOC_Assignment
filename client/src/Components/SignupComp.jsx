import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signup } from '../Redux/Slice/UserSlice';

function SignupComp() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signup({ data, navigate }))
    };

    return (
        <>
            <div className="container mt-5 w-50">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type='text'
                            placeholder=' Name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            className='form-control'
                        />
                    </div>
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
                        Signup
                    </button>
                </form>
                {/* <Google /> */}
                <Link to={'/login'}>
                    <div className="d-flex justify-content-center">
                        <button type='button' className='btn btn-secondary'>
                            SignIn
                        </button>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SignupComp
