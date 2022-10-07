const Post = require('../models/posts');
const fs = require('fs');

exports.getAllPosts = (req, res) => {
  Post.find()
    .populate('user', { firstName: 1, lastName: 1 })
    .then((posts) => {
      res.status(200).json(posts.reverse());
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createPost = (req, res) => {
  const postObject = JSON.parse(req.body.post);
  if (req.file) {
    const post = new Post({
      ...postObject,
      usersLiked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((error) => res.status(400).json({ error }));
  } else {
    const post = new Post({
      ...postObject,
      usersLiked: [],
      imageUrl: null,
    });
    post
      .save()
      .then(() => res.status(201).json(post))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getPostsById = (req, res) => {
  Post.find({
    user: req.params.userId,
  })
    .populate('user', { firstName: 1, lastName: 1 })
    .then((posts) => {
      res.status(200).json(posts.reverse());
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updatePost = (req, res) => {
  if (req.file) {

    Post.updateOne(
      { _id: req.params.id },
      {
        ...JSON.parse(req.body.post),
        _id: req.params.id,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    
    Post.updateOne(
      { _id: req.params.id },
      {
        ...JSON.parse(req.body.post),
        _id: req.params.id,
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.likePost = (req, res) => {
  if (req.body.like == 1) {
    Post.updateOne(
      { _id: req.body.id },
      {
        $push: {
          usersLiked: req.params.userId,
        },
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Post.updateOne(
      { _id: req.body.id },
      {
        $pull: {
          usersLiked: req.params.userId,
        },
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};
