import { Button, Grid, Typography } from '@mui/material';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

import Navbar from "../common/Navbar";


const Game = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let value = cookies.load('sessionid') !== undefined;
        if (!value) {
            toast.error('Please login to continue', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Navbar />
        </>
    );
};

export default Game;
