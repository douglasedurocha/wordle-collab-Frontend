import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar = () => {
    const handleLogout = () => {
        toast.warning('You logged out', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Wordle Collab
                </Typography>
                <Button color="inherit" component={Link}>
                    Profile
                </Button>
                <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
