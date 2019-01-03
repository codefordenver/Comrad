const bcrypt = require('bcrypt-nodejs');
const db = require('../models');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { emailTemplate, transport } = require('../utils/mail');

module.exports = {
  async requestReset(req, res) {
    const { email } = req.body;
    const user = await db.User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    await db.User.findOneAndUpdate(
      { email },
      { reset_token: resetToken, reset_token_expiry: resetTokenExpiry },
      { new: true },
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json({ message: err }));

    await transport.sendMail({
      from: 'comrad.development@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(
        `<a target="_blank" href="${process.env.PORT ||
          'localhost:3000'}/reset?resetToken=${resetToken}">Click Here</a>`,
      ),
    });
  },

  async resetPassword(req, res) {
    const { confirm_password, password, resetToken } = req.body;

    if (confirm_password !== password) {
      return res.status(401).json({ message: 'Your passwords do not match!' });
    }

    const user = await db.User.findOne({
      reset_token: resetToken,
      reset_token_expiry: {
        $gte: Date.now() - 3600000,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'Your information is invalid' });
    }

    await bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(422).json({ message: err });
      }

      bcrypt.hash(password, salt, null, async (err, hash) => {
        if (err) {
          return res.status(422).json({ message: err });
        }

        const updatedUser = await db.User.findOneAndUpdate(
          { email: user.email },
          { password: hash, reset_token: null, reset_token_expiry: null },
          { new: true },
        );

        return res.json(updatedUser);
      });
    });
  },
};
