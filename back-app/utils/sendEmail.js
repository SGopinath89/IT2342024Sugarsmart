const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || config.get('emailUser'),
      pass: process.env.EMAIL_PASS || config.get('emailPass')
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || config.get('emailUser'),
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;