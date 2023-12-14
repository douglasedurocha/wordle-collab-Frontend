import axios from 'axios';
import cookies from 'react-cookies';

import { 
    Container,
    Grid,
    Typography,
    Paper,
    Tabs,
    Tab,
    TextField,
    Button,
    Input,
    IconButton,
    InputAdornment 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from 'react';



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    // TODO: Put this in a .env file 
    baseURL: "http://127.0.0.1:8000/api/accounts",
    sameSite: 'none',
});

const LoginSignup = () => {
    const [currentUser, setCurrentUser] = useState();
    const [action, setAction] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const fetchUserProfile = () => {
        client.get("/user", {
            headers: {"X-CSRFToken": cookies.load('csrftoken')}
        })
        .then(function(res) {
            setCurrentUser(true);
        })
        .catch(function(error) {
            setCurrentUser(false);
        });
    };

    useEffect(() => {
        fetchUserProfile();
    })

    const handleSubmit = (e) =>{
        e.preventDefault();

        client.post(`/${action}`,{
                email: email,
                password: password
            },
            {
                headers: {"X-CSRFToken": cookies.load('csrftoken')}
            })
            .then((res) => {
                setCurrentUser(true);
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    const handleChange = (event, newValue) => {
        setAction(newValue);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    style={{ minHeight: "100vh"}}
                >
                    <Paper elevation={3} sx={{ p: 5}}>
                        <Typography variant="h5" gutterBottom align="center">
                            WELCOME
                        </Typography>
                        <Grid item sx={{mb:4}}>
                            <Tabs value={action} onChange={handleChange} aria-label="Login or Sign up" centered>
                                <Tab value="register" label="Register" />
                                <Tab value="login" label="Login" />
                            </Tabs>
                        </Grid>
                        
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    type="email"
                                    fullWidth
                                    label="Enter your email"
                                    placeholder="Email Adress"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type={showPass ? "text" : "password"}
                                    fullWidth
                                    label="Enter your password"
                                    placeholder="Email Password"
                                    variant="outlined"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => {setShowPass(!showPass)}}
                                                aria-label="toggle password"
                                                edge="end"
                                            >
                                                {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                >
                                </TextField>
                            </Grid>

                            <Grid item>
                                <Button fullWidth variant="contained" color="primary" type="submit">
                                {action}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                </form>
            </Container>
        </div>
    )
}

export default LoginSignup;