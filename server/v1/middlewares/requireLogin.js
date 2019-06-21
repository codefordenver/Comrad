function requireLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ message: 'User must log in' });
  }

  next();
}

module.exports = requireLogin;
