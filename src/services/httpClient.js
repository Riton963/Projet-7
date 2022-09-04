import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 30000, // milliseconds
  headers: {
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default httpClient;
