function logout(req, res) {
  req.logout();
  res.status(200).json({ message: 'User has been logged out' });
}

module.exports = logout;
