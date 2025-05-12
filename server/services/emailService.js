// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(to, subject, html) {
  const info = await transporter.sendMail({
    from: `"Math Mentor" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  console.log('E-mail wysłany:', info.messageId);
}

async function sendConfirmationEmail(to) {
  return sendEmail(to, 'Potwierdzenie konta', '<h2>Witaj!</h2><p>Dziękujemy za rejestrację.</p>');
}

async function sendResetPasswordEmail(to, newPassword) {
  return sendEmail(to, 'Reset hasła', `<p>Twoje nowe hasło to: <strong>${newPassword}</strong></p>`);
}

module.exports = {
  sendConfirmationEmail,
  sendResetPasswordEmail,
};
