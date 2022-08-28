import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/auth/';

const signUp = (firstName, lastName, email, password) =>
  axios.post(apiUrl + 'signup', {
    firstName,
    lastName,
    email,
    password,
  });

const login = (email, password) =>
  axios.post(apiUrl + 'login', { email, password });

export default { signUp, login };
