import axios from 'axios';

let token = JSON.parse(localStorage.getItem('token'));

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api/posts/',
  timeout: 30000, // milliseconds
  headers: {
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  token = JSON.parse(localStorage.getItem('token'));
  config.headers['SmagAuthorization'] = `Bearer ${token.userId}`;
  console.log(config);
  return config;
});
