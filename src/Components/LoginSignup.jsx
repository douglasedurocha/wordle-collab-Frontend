import { Container, Grid, Paper, Tabs, Tab, TextField, Button, Input, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';


const LoginSignup = () => {
    const [action, setAction] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleChange = (event, newValue) => {
        setAction(newValue);
    };

    const handleSubmit = (e) =>{
        return null;
    }

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
                        <Grid item sx={{mb:4}}>
                            <Tabs value={action} onChange={handleChange} aria-label="basic tabs example" centered>
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