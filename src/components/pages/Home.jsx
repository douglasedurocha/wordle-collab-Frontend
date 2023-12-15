// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { Typography } from '@mui/material';
import Navbar from "../common/Navbar";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let value = cookies.load('sessionid') !== undefined;
        if (!value) {
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Typography variant="h5" align='center' sx={{ m: 4 }}>Welcome to Wordle Collab!</Typography>
        </div>
    );
};

export default Home;
