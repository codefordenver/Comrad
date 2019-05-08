const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');

async function passwordNew(req, res) {
  const { passwordConfirm, passwordNew, resetToken } = req.body;

  if (!passwordConfirm || !passwordNew) {
    return res.status(401).json('Password Confirm and/or Password New Missing');
  }

  if (passwordConfirm !== passwordNew) {
    return res.status(401).json('Your passwords do not match!');
  }

  const user = await db.User.findOne({
    'auth.reset_token': resetToken,
    'auth.reset_token_expiry': {
      $gte: Date.now() - 3600000,
    },
  });

  if (!user) {
    return res.status(404).json('Your token has expired or is invalid');
  }

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(passwordNew, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      const updatedUser = await db.User.findOneAndUpdate(
        { 'contact.email': user.contact.email },
        {
          'auth.password': hash,
          'auth.reset_token': null,
          'auth.reset_token_expiry': null,
        },
        { new: true },
      );

      return res.json(updatedUser);
    });
  });
}

module.exports = passwordNew;
