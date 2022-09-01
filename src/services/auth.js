import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/auth/';
const token = JSON.parse(localStorage.getItem('token'));

const signUp = (firstName, lastName, email, password) =>
  axios.post(apiUrl + 'signup', {
    firstName,
    lastName,
    email,
    password,
  });

const login = (email, password) =>
  axios.post(apiUrl + 'login', { email, password });

const addProfileImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.put(apiUrl + token.userId, formData, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

export default { signUp, login, addProfileImage };
