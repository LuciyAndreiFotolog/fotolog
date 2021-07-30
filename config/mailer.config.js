const nodemailer = require('nodemailer');
const template = require('./mailtemplate');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NM_USER,
    pass: process.env.NM_PASSWORD
  }
});

module.exports.sendActivationMail = (email, token) => {
  transporter.sendMail({
    from: `Fotolog <${process.env.NM_USER}>`,
    to: email,
    subject: 'Welcome to Fotolog',
    html: template.generateEmail(token),
  })
}