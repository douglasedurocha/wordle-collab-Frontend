import { Button, Grid, Typography } from '@mui/material';

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

import Navbar from "../common/Navbar";


const Game = () => {
    const params = useParams();
    const navigate = useNavigate();

    const gameId = params.id;

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
            <Typography variant="h5" align="center" sx={{ mt: 2 }}>Game {gameId}</Typography>
        </>
    );
};

export default Game;
