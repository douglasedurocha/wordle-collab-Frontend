import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import {
  Button,
  Grid,
  Typography,
  TextField,
  Container,
  Avatar,
} from '@mui/material';

import Navbar from '../common/Navbar';
import WordleWord from '../common/WordleWord';

import authService from '../../services/authService';
import gameService from '../../services/gameService';

const Game = () => {
  const [messages, setMessages] = useState([]);
  const [myAttemptWord, setMyAttemptWord] = useState('');
  const [myUser, setMyUser] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const gameId = params.id;

  const client = useMemo(
    () => new W3CWebSocket('ws://127.0.0.1:8000/ws/' + gameId),
    [gameId],
  );

  const handleAttempt = () => {
    if (myAttemptWord.length !== 5) {
      toast.error('Please enter a 5 letter word', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    client.send(
      JSON.stringify({
        word: myAttemptWord,
        player: {
          email: myUser,
        },
      }),
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAttempt();
    }
  };

  const getColor = (charCode) => {
    const hex = ((charCode - 65) * 360) / 40;
    let color = '#' + hex.toString(16);
    return color;
  };

  useEffect(() => {
    authService
      .fetchUserProfile()
      .then((user) => {
        setMyUser(user.email);
        gameService
          .getAttemtsByGameId(gameId)
          .then((attempts) => {
            console.log(attempts);
            setMessages(attempts);
            (client.onopen = () => {
              console.log('WebSocket Client Connected');
            }),
              (client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                if (dataFromServer) {
                  if (dataFromServer.msg_type === 'notify') {
                    const alertType =
                      dataFromServer.alert === 'error'
                        ? toast.TYPE.ERROR
                        : toast.TYPE.SUCCESS;

                    toast(dataFromServer.message, {
                      position: toast.POSITION.TOP_CENTER,
                      type: alertType,
                    });
                  } else if (dataFromServer.msg_type === 'attempt') {
                    setMessages((messages) => [
                      ...messages,
                      {
                        word: dataFromServer.word,
                        player: dataFromServer.player,
                        hint: dataFromServer.hint,
                      },
                    ]);
                  }
                }
              });
          })
          .catch(() => {
            toast.error('Game room does not exist', {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate('/');
          });
      })
      .catch(() => {
        toast.error('Please login to continue', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/login');
      });
  }, [client, gameId, navigate]);

  return (
    <>
      <Navbar />
      <Container maxWidth="xs" onKeyDown={handleKeyPress}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          marginTop={2}
        >
          <Typography variant="h5" align="center">
            Game {gameId}
          </Typography>
          <Grid
            justifyContent="center"
            flexGrow={0.3}
            sx={{ mt: 2, minHeight: '50vh' }}
          >
            {messages.map((message, i) => (
              <Grid
                container
                justify="center"
                alignItems={'center'}
                sx={{ marginBottom: -5 }}
                key={i}
              >
                {(message.player.email !== myUser && (
                  <Grid item xs={1}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: getColor(message.player.email.charCodeAt(1)),
                        textTransform: 'uppercase',
                      }}
                    >
                      {message.player.email.charAt(0)}
                    </Avatar>
                  </Grid>
                )) || <Grid item xs={1}></Grid>}
                <Grid item xs={10}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 70,
                        md: 70,
                        sm: 60,
                        xs: 60,
                      },
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: 10,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    <WordleWord word={message.word} hint={message.hint} />
                  </Typography>
                </Grid>
                {message.player.email === myUser && (
                  <Grid item xs={1}>
                    <Avatar
                      sx={{ ml: -2, width: 30, height: 30, bgcolor: '#e33d4e' }}
                    >
                      Me
                    </Avatar>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
          <TextField
            inputProps={{
              maxLength: 5,
              sx: {
                fontSize: {
                  lg: 70,
                  md: 70,
                  sm: 60,
                  xs: 60,
                },
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: 10,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            }}
            textTransform="uppercase"
            variant="standard"
            algin="center"
            sx={{ my: 1, mx: 'auto', width: '75%' }}
            onChange={(e) => {
              setMyAttemptWord(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            color="primary"
            onClick={handleAttempt}
          >
            Enter
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Game;
