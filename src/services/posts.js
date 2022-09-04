import httpClient from './httpClient';
import authServices from '../services/auth';

const apiUrl = 'posts/';

const getAllPosts = () => {
  return httpClient.get(apiUrl);
};

const getPostsById = () => {
  return httpClient.get(apiUrl + authServices.getUserId());
};

const createPost = (post, image) => {
  const formData = new FormData();
  formData.append('post', post);
  formData.append('image', image);

  return httpClient.post(apiUrl, formData);
};

const deletePost = (id) => {
  return httpClient.delete(apiUrl + id);
};

const likePost = (like) => {
  return httpClient.post(apiUrl + authServices.getUserId() + '/like', like);
};

const updatePost = (postObject, file) => {
  const formData = new FormData();
  formData.append('post', JSON.stringify(postObject));
  formData.append('image', file);
  return httpClient.put(apiUrl + postObject.postId, formData);
};

export default {
  getAllPosts,
  createPost,
  getPostsById,
  updatePost,
  likePost,
  deletePost,
};
