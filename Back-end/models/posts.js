const User = require('./users');

const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  usersLiked: { type: Array, required: true },
});

module.exports = mongoose.model('Post', postsSchema);
