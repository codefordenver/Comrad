const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailTemplate = (template, mergeTags) => {
  Object.keys(mergeTags).forEach(function(key) {
    template = template.replace(
      new RegExp('\\[' + key + '\\]', 'g'),
      mergeTags[key],
    );
  });
  template = template.replace(/\[(.*)\]/g, '');
  return template;
};

module.exports = {
  transport,
  emailTemplate,
};
