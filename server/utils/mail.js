const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailTemplate = text => `
  <div>
    <h1>Reset Password!</h1>
    <p>Link here: <span>${text}</span></p>
    <p>Comrad Team</p>
  </div>
`;

exports.transport = transport;
exports.emailTemplate = emailTemplate;
