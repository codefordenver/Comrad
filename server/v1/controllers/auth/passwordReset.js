const db = require('../../models');
const fs = require('fs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { emailTemplate, transport } = require('../../utils/mail');

async function passwordReset(req, res) {
  const { email } = req.body;

  const user = await db.User.findOne({ email });

  if (!user) {
    return res.status(404).json('Email does not exist!');
  } else if (user.status != 'Active') {
    return res.status(404).json('The email is currently inactive.');
  }

  const randomBytesPromiseified = promisify(randomBytes);
  const resetToken = (await randomBytesPromiseified(20)).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000;

  await db.User.findOneAndUpdate(
    { email },
    {
      reset_token: resetToken,
      reset_token_expiry: resetTokenExpiry,
    },
    { new: true },
  )
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));

  const PORT = process.env.PORT || 'localhost:3000';

  await transport.sendMail({
    from: 'comrad.development@gmail.com',
    to: user.email,
    subject: 'Comrad: Reset Your Password',
    html: emailTemplate(
      fs.readFileSync('server/v1/templates/emailChangePassword.html', 'utf-8'),
      {
        password_reset_link: `${PORT}/new?rt=${resetToken}`,
        user_first_name: user.first_name,
      },
    ),
  });
}

module.exports = passwordReset;
