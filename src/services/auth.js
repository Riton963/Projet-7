import httpClient from './httpClient';
import VueJwtDecode from 'vue-jwt-decode';

const apiUrl = 'http://localhost:3000/api/users/';

const signUp = (firstName, lastName, email, password) =>
  httpClient.post(apiUrl + 'signup', {
    firstName,
    lastName,
    email,
    password,
  });

const login = (email, password) => {
  return httpClient.post(apiUrl + 'login', { email, password });
};

const getUserId = () => {
  return VueJwtDecode.decode(localStorage.getItem('token')).userId;
};

const addProfileImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return httpClient.put(apiUrl + token.userId, formData);
};

const getUserById = () => {
  return httpClient.get(apiUrl, token.userId);
};

export default { signUp, login, addProfileImage, getUserById, getUserId };
