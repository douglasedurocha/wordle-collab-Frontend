import axios from 'axios';
import cookies from 'react-cookies';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    // TODO: Put this in a .env file
    baseURL: "http://127.0.0.1:8000/api/games",
    sameSite: 'none',
});

const gameService = {
    createGame: async () => {
        try {
            const res = await client.post("/create", null, {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    getGame: async (gameId) => {
        try {
            const res = await client.get(`/${gameId}`, {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    listOpenGames: async () => {
        try {
            const res = await client.get("/list-open", {
                headers: { "X-CSRFToken": cookies.load('csrftoken') }
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};

export default gameService;