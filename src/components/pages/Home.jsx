import {
    Container,
    Button,
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PersonIcon from '@mui/icons-material/Person';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

import gameService from '../../services/gameService';
import Navbar from "../common/Navbar";

function GameListItem({ game }) {
    return (
        <ListItem>
            <ListItemIcon>
                <IconButton><PlayCircleIcon /></IconButton>
            </ListItemIcon>
            <ListItemText
                primary={`game ${game.id}`}
                secondary={`Created by ${game.author_email}`}
            />
            <Typography
                edge="end"
            >
                {`${game.players_count}/${game.max_players}`}<PersonIcon sx={{mb: -0.6}}/>
            </Typography>
        </ListItem>
    );
}

const Home = () => {
    const [games, setGames] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let value = cookies.load('sessionid') !== undefined;
        if (!value) {
            toast.error('Please login to continue', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
        } else {
            gameService.listOpenGames()
                .then(games => {
                    setGames(games);
                    console.log(games);
                })
                .catch(err => {
                    console.log(err);
                });
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
                <Typography variant="h5" sx={{ mt: 4 }}>Open Games</Typography>
                <List>
                    {games.map((game) => (
                        <GameListItem key={game.id} game={game} />
                    ))}
                </List>
            </Container>
        </div>
    );
};

export default Home;
