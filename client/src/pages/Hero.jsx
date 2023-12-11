import React, { useState, useEffect } from 'react';
import backendPortURL from '../constants';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useLocation } from 'react-router-dom';

const Hero = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const token = (queryParams.get('token'));

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            // Retrieve the token from the cookie
            console.log(token);

            if (!token) {
                console.error('Token is missing');
                // Handle the case where the token is missing, maybe redirect to the login page
                window.location.href = '/login';
            }

            const response = await axios.get(backendPortURL + 'api/user-details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure credentials are sent with the request
            });
            setUserDetails(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Redirect to login page'); // Redirect to the login page
                window.location.href = '/login';
            } else {
                console.error('Authentication error:', error);
                window.location.href = '/login';
            }
        }
    };

    return (
        <div>
            {userDetails ? (
                <div>
                    <p>Welcome, {userDetails.email}!</p>
                    <p>ID: {userDetails.id}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Hero;
