const User = require('../models/user');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./emailService');

async function createUser(email, password) {
  const user = new User({ email, password });
  await user.save();
  await sendConfirmationEmail(email);
}

async function resetUserPassword(email) {
  const newPassword = 'abc123'; // Tutaj możesz wygenerować nowe hasło
  await sendResetPasswordEmail(email, newPassword);
}

module.exports = {
  createUser,
  resetUserPassword,
};
