const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  job: { type: String },
  coverImgUrl: { type: String },
  profileImgUrl: { type: String },
  role: { type: String, default: 'user', required: true },
  userFollowed: { type: Array, required: true },
  followers: { type: Array, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
