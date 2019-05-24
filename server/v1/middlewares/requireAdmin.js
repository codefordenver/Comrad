// User must have admin permissions.
function requireAdmin(req, res, next) {
  const { permissions = [] } = req.user;

  // Returns first value that matches admin. Otherwise will return undefined.
  if (!permissions.find(item => item.toLowerCase() === 'admin')) {
    return res.status(401).json({ message: 'User requires admin permissions' });
  }

  next();
}

module.exports = requireAdmin;
