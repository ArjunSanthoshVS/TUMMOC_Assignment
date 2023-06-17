import React, { useState } from 'react'
import * as api from '../Redux/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function City() {
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const navigate = useNavigate()
    const [data, setData] = useState({
        city: "",
        userId: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const requestData = { ...data, userId: user._id };
        await api.city(requestData);
        setData({ city: "" });
    };
    return (
        <>
            <div className="container mt-5 w-50">
                <h2>Favourite Cities</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type='city'
                            placeholder='city'
                            name='city'
                            onChange={handleChange}
                            value={data.city}
                            className='form-control'
                            required
                        />
                    </div>
                    <button type='submit' className='mb-3 btn btn-primary'>
                        Submit
                    </button>
                </form>
                <div className="mt-4">
                    <button className='btn btn-warning' onClick={() => navigate('/cities')}>View Cities</button>
                </div>
            </div>
        </>
    )
}

export default City
