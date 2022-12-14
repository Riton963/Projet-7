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
        followers: [],
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
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Email ou mot de passe incorrect' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'PANEL_CITRON_LANGAGE_PROMISE_JARVIS_GOLF_ATHENA',
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
    'followers',
  ])
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

exports.followedUser = (req, res, next) => {
  if (req.body.follow) {
    User.updateOne(
      { _id: req.body.userId },
      {
        $push: {
          followers: req.body.ownerId,
        },
      }
    )
      .then(() => {
        User.updateOne(
          { _id: req.body.ownerId },
          {
            $push: {
              userFollowed: req.body.userId,
            },
          }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    User.updateOne(
      { _id: req.body.userId },
      {
        $pull: {
          followers: req.body.ownerId,
        },
      }
    )
      .then(() => {
        User.updateOne(
          { _id: req.body.ownerId },
          {
            $pull: {
              userFollowed: req.body.userId,
            },
          }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
    next();
  }
};

exports.followUser = (req, res, next) => {};
