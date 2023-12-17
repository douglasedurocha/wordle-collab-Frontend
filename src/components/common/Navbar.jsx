import { AppBar, Toolbar, Box, Grid, Button } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Logo from "../../assets/logo.png";


const Navbar = () => {
    const handleLogout = () => {
        toast.warning('You logged out', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    component="img"
                    sx={{
                        height: 64,
                        pr: 2,
                    }}
                    alt="Your logo."
                    src={Logo}
                />
                <Grid container justifyContent="end">
                    <Button color="inherit" component={Link}>
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
                        Logout
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
