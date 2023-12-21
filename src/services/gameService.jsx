import axios from 'axios';
import cookies from 'react-cookies';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  // TODO: Put this in a .env file
  baseURL: 'http://127.0.0.1:8000/api/games',
  sameSite: 'none',
});

const gameService = {
  createGame: async () => {
    const res = await client.post('/create', null, {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },

  getGame: async (gameId) => {
    const res = await client.get(`/${gameId}`, {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },

  listOpenGames: async () => {
    const res = await client.get('/list-open', {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },

  getAttemtsByGameId: async (gameId) => {
    const res = await client.get(`/${gameId}/attempts`, {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },
};

export default gameService;
