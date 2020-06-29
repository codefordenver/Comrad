function current(req, res) {
  if (req.user) {
    const userObj = req.user;

    delete userObj._doc.password;

    return res.json(userObj);
  }

  res.send(false);
}

module.exports = current;
