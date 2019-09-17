function current(req, res) {
  if (req.user) {
    const userObj = req.user;

    console.log(req.user);

    delete userObj._doc.password;

    res.json(userObj);
  }
}

module.exports = current;
