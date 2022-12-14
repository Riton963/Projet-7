const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(
      token,
      'PANEL_CITRON_LANGAGE_PROMISE_JARVIS_GOLF_ATHENA'
    );

    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
