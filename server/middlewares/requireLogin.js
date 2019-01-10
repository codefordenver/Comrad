module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ errorMessage: 'You must log in!' });
  }

  next();
};
