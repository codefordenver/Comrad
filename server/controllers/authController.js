module.exports = {
  login: (req, res) => {
    const { _id, email, first_name, image, last_name, station } = req.user;
    const { on_air_name, permissions } = station;

    res.json({
      _id,
      email,
      first_name,
      image,
      last_name,
      on_air_name,
      permissions,
    });
  },

  logout: (req, res) => {
    req.logout();
    res.json({ email: '' });
  },

  current: (req, res) => {
    const { email } = req.user;
    res.json({ email });
  },
};
