import axios from 'axios';
let token = JSON.parse(localStorage.getItem('token'));

const apiUrl = 'http://localhost:3000/api/posts/';

const getAllPosts = () =>
  axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

const getPostsById = () =>
  axios.get(apiUrl + token.userId, {
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

const deletePost = (id) => {
  return axios.delete(apiUrl + id, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

const likePost = (like) => {
  return axios.post(apiUrl + token.userId + '/like', like, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

const updatePost = (postObject, file) => {
  const formData = new FormData();
  formData.append('post', JSON.stringify(postObject));
  formData.append('image', file);
  return axios.put(apiUrl + postObject.postId, formData, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
};

export default {
  getAllPosts,
  createPost,
  getPostsById,
  updatePost,
  likePost,
  deletePost,
};
