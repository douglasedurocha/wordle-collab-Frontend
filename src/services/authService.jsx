import axios from 'axios';
import cookies from 'react-cookies';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/accounts`,
  sameSite: 'none',
});

const authService = {
  fetchUserProfile: async () => {
    const res = await client.get('/user', {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },

  loginUser: async (email, password) => {
    const res = await client.post(
      '/login',
      {
        email: email,
        password: password,
      },
      {
        headers: { 'X-CSRFToken': cookies.load('csrftoken') },
      },
    );
    return res.data;
  },

  registerUser: async (email, password) => {
    const res = await client.post(
      '/register',
      {
        email: email,
        password: password,
      },
      {
        headers: { 'X-CSRFToken': cookies.load('csrftoken') },
      },
    );
    return res.data;
  },

  logoutUser: async () => {
    const res = await client.post('/logout', null, {
      headers: { 'X-CSRFToken': cookies.load('csrftoken') },
    });
    return res.data;
  },
};

export default authService;
