import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/posts/';
const token = JSON.parse(localStorage.getItem('token'));

const getAllPosts = () =>
  axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

const createPost = (post, image) => {
  const formData = new FormData();
  formData.append('post', post);
  formData.append('image', image);

  return axios.post(apiUrl, formData, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

const likePost = (like) => {
  axios.post(apiUrl + '/like', like, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

export default { getAllPosts, createPost };
