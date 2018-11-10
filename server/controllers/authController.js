module.exports = {
  login: (req, res) => {
    const { _id, email } = req.user;
    res.json({ _id, email });
  },

  logout: (req, res) => {
    req.logout();
    res.json({ email: '' })
  },

  current: (req, res) => {
    const { email } = req.user;
    res.json({ email });
  }
}