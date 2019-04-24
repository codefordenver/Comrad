const db = require('../../../models/v1');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { emailTemplate, transport } = require('../../../utils');

async function passwordReset(req, res) {
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
}

module.exports = passwordReset;
