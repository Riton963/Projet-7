const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        profileImgUrl: null,
        coverImgUrl: null,
        job: null,
        userFollowed: [],
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'PANEL_CITRON_LANGAGE_PROMISE_JARVIS',
              {
                expiresIn: '24h',
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateProfile = (req, res, next) => {
  User.updateOne(
    { _id: req.params.userId },
    {
      ...req.body.userData,
      _id: req.params.id,
    }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateProfileImg = (req, res, next) => {
  User.updateOne(
    { _id: req.params.userId },
    {
      $set: {
        profileImgUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      },
    }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateCoverImg = (req, res, next) => {
  User.updateOne(
    { _id: req.params.userId },
    {
      $set: {
        coverImgUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      },
    }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.userId }, [
    'profileImgUrl',
    'coverImgUrl',
    'firstName',
    'lastName',
    'role',
    'job',
    'userFollowed',
  ])
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

exports.followUser = (req, res, next) => {
  if (req.body.follow) {
    User.updateOne(
      { _id: req.params.userId },
      {
        $push: {
          userFollowed: req.body.userId,
        },
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    User.updateOne(
      { _id: req.params.userId },
      {
        $pull: {
          userFollowed: req.body.userId,
        },
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};
