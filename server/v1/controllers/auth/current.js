function current(req, res) {
  const userObj = req.user;

  delete userObj._doc.password;

  res.json(userObj);
}

module.exports = current;
