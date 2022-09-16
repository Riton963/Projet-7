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

const addProfileImage = (fileProfileImage) => {
  const formData = new FormData();
  formData.append('image', fileProfileImage);
  return httpClient.put(apiUrl + '/profileImg/' + getUserId(), formData);
};

const addCoverImage = (fileCoverImage) => {
  const formData = new FormData();
  formData.append('image', fileCoverImage);
  return httpClient.put(apiUrl + '/coverImg/' + getUserId(), formData);
};

const getUserById = (userId) => {
  return httpClient.get(apiUrl + userId);
};

const updateUserProfile = (userData) => {
  return httpClient.put(apiUrl + getUserId(), { userData: userData });
};

export default {
  signUp,
  login,
  addProfileImage,
  addCoverImage,
  getUserById,
  getUserId,
  updateUserProfile,
};
