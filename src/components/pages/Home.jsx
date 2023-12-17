import {
    Container,
    Button,
    Box,
    Grid,
    Typography,
} from '@mui/material';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

import Navbar from "../common/Navbar";


const Home = () => {
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
        <div>
            <Navbar />
            <Typography variant="h5" align='center' sx={{ mt: 4 }}>Welcome to Wordle Collab!</Typography>
            <Container maxWidth="md">
                <Grid container spacing={0} justifyContent={"center"} sx={{ minHeight: "10vh"}}>
                    <Box
                        display="flex" justifyContent="space-between" alignItems="center"
                    >
                        <Button variant="contained" color="success" sx={{mr:1}}>Create</Button>
                        <Button variant="contained" color="warning">Join</Button>
                    </Box>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;
