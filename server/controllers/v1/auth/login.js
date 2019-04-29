function login(req, res) {
  const { contact, location, profile, station } = req.user;
  res.json({ contact, location, profile, station });
}

module.exports = login;
