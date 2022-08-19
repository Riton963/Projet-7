import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/posts/';
const token = JSON.parse(localStorage.getItem('token'));

const getAllPosts = () =>
  axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

const createPost = (post) => axios.post(apiUrl, {});

export default { getAllPosts };
