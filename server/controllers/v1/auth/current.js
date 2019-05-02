function current(req, res) {
  const { _id, contact, location, profile, station } = req.user;
  res.json({ _id, contact, location, profile, station });
}

module.exports = current;
