// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Wordle Collab
                </Typography>
                <Button color="inherit" component={Link}>
                    Profile
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
