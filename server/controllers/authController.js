module.exports = {
  login: (req, res) => {
    const { _id, email, permissions } = req.user;
    res.json({ _id, email, permissions });
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
