import httpClient from './httpClient';
import VueJwtDecode from 'vue-jwt-decode';

const apiUrl = 'users/';

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
  return httpClient.put(apiUrl + getUserId(), formData);
};

const getUserById = () => {
  return httpClient.get(apiUrl + getUserId());
};

export default { signUp, login, addProfileImage, getUserById, getUserId };
