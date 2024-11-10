import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5211/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': localStorage.getItem('jwt'),
  },
});

export default api;

