module.exports = {
  signin: (req, res) => {
    const { email } = req.user;
    res.json({ email });
  },

  signout: (req, res) => {
    req.logout();
    res.json({ email: '' })
  },

  current: (req, res) => {
    const { email } = req.user;
    res.json({ email });
  }
}