const User = require('../models/user');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./emailService');

async function createUser(email, password) {
  const user = new User({ email, password });
  await user.save();
  await sendConfirmationEmail(email);
}


function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


async function resetUserPassword(email) {
  
  const newPassword = generatePassword();

  await sendResetPasswordEmail(email, newPassword);
}

module.exports = {
  createUser,
  resetUserPassword,
};
