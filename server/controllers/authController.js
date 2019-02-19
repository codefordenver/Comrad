const bcrypt = require('bcrypt-nodejs');
const db = require('../models');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { emailTemplate, transport } = require('../utils/mail');

module.exports = {
  async login(req, res) {
    const { contact, location, profile, station } = req.user;
    res.json({ contact, location, profile, station });
  },

  async logout(req, res) {
    req.logout();
    res.status(200).json('User has been logged out!');
  },

  async current(req, res) {
    const { contact, location, profile, station } = req.user;
    res.json({ contact, location, profile, station });
  },

  async passwordReset(req, res) {
    const { email } = req.body;

    const user = await db.User.findOne({ 'contact.email': email });

    if (!user) {
      return res.status(404).json('Email does not exist!');
    }

    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    await db.User.findOneAndUpdate(
      { 'contact.email': email },
      {
        'auth.reset_token': resetToken,
        'auth.reset_token_expiry': resetTokenExpiry,
      },
      { new: true },
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));

    const PORT = process.env.PORT || 'localhost:3000';

    await transport.sendMail({
      from: 'comrad.development@gmail.com',
      to: user.contact.email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(
        `<a target="_blank" href="${PORT}/new?rt=${resetToken}">Click Here</a>`,
      ),
    });
  },

  async passwordNew(req, res) {
    const { passwordConfirm, passwordNew } = req.body;
    const { rt: resetToken } = req.query;

    if (!passwordConfirm || !passwordNew) {
      console.log('Empty');
      return res
        .status(401)
        .json('Password Confirm and/or Password New Missing');
    }

    if (passwordConfirm !== passwordNew) {
      console.log("Don't Match");
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

        console.log(updatedUser);

        return res.json(updatedUser);
      });
    });
  },
};
