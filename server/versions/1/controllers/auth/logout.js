function logout(req, res) {
  req.logout();
  res.status(200).json('User has been logged out');
}

module.exports = logout;
