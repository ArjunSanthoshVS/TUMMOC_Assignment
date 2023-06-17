import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { decodeJwt } from 'jose'
import axios from 'axios'
import { setUser } from '../Redux/Slice/UserSlice'

function Google() {
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const payload = credential ? decodeJwt(credential) : undefined;
            if (payload) {
                const response = await axios.get('http://localhost:5000/google', {
                    headers: {
                        Authorization: `Bearer ${credential}`
                    }
                });
                const user = response.data;
                localStorage.setItem('userToken', JSON.stringify(user));
                setUser(user) // Store the token in local storage
                window.location = '/'; // Redirect the user to the home page
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="App d-flex justify-content-center">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={console.error}
                    useOneTap
                />
            </div>
        </>
    )
}

export default Google
