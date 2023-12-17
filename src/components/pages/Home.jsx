import {
    Container,
    Modal,
    TextField,
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
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCreateGame = () => {
        gameService.createGame()
            .then(game => {
                setGameId(game.id);
                navigate(`/game/${game.id}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleJoinGame = () => {
        gameService.getGame(gameId)
            .then(game => {
                setShowModal(false);
                navigate(`/game/${game.id}`);
            })
            .catch(err => {
                console.log(err);
                setShowModal(false);
                toast.error('Game not found', {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

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
                        <Button variant="contained" color="success" sx={{mr:1}} onClick={handleCreateGame}>Create</Button>
                        <Button variant="contained" color="warning" onClick={() => setShowModal(true)}>Join</Button>
                            <Modal open={showModal} onClose={handleCloseModal}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Typography variant="h6" component="h2" align='center' sx={{mb:3}}>
                                        Enter the game ID
                                    </Typography>
                                    <Grid 
                                        container
                                        direction="column"
                                        justifyContent="center"
                                    >
                                        <TextField
                                            label="Search field"
                                            type="number"
                                            required
                                            onChange = {(e) => setGameId(e.target.value)}
                                        />
                                        <Button variant="contained" color="success" sx={{mt:3}} type="submit" onClick={handleJoinGame}>Join</Button>
                                    </Grid>
                                </Box>
                            </Modal>
                    </Box>
                </Grid>
                <Typography variant="h5" sx={{ mt: 4 }}>Open Games</Typography>
                {games.length > 0 ? (
                    <List>
                        {games.map((game) => (
                            <GameListItem key={game.id} game={game} />
                        ))}
                    </List>
                ) : (
                    <Typography variant="h6" color={"text.secondary"} sx={{ mt: 4 }} align='center'>There are no games open at the moment</Typography>
                )}
            </Container>
        </div>
    );
};

export default Home;
