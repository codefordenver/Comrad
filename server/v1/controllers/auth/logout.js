function logout(req, res) {
  req.logout((err) => {
    if (err) { console.error(err); return next(err); };
    return res.status(200).json({ message: 'User has been logged out' });
  });
}

module.exports = logout;
