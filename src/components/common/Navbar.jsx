import { AppBar, Toolbar, Box, Grid, Button, ButtonBase } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Logo from "../../assets/logo.png";


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.warning('You logged out', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <ButtonBase>
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                            pr: 2,
                        }}
                        alt="Your logo."
                        src={Logo}
                        onClick={() => navigate('/')}
                    />
                </ButtonBase>
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
