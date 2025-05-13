const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.createUser(email, password);
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.resetUserPassword(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ message: 'Error reseting password' });
  }
};
