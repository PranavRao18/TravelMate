import React, {useState, useEffect } from 'react';
import backendPortURL from '../constants';

const Hero = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch user details using the token
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // If the token is not present, redirect to the login page
            if (!token) {
                window.location.href = '/login';
                return;
            }

            // Fetch user details from an authenticated route using the token
            const response = await axios.get(backendPortURL + 'api/user-details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // If the request is successful, update the user details
            setUserDetails(response.data);
        } catch (error) {
            // Handle authentication error
            console.error('Authentication error:', error);

            // If the error status is 401 (Unauthorized), redirect to the login page
            if (error.response && error.response.status === 401) {
                // Redirect to the login page
                window.location.href = '/login';
            }
        }
    };

    return (
        <div>
            {userDetails ? (
                // Display user details
                <div>
                    <p>Welcome, {userDetails.username}!</p>
                    <p>ID: {userDetails._id}</p>
                </div>
            ) : (
                // Optionally, you can show a loading message or spinner while fetching data
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Hero;
