const bcrypt = require('bcrypt');
const User = require('../models/user');

// register a new user
async function registerUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('Password and Confirm Password do not match.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.send('Registration successful. You can now <a href="/">Sign In</a>.');
  } catch (error) {
    console.error(error);
    res.send('An error occurred during registration.');
  }
}

// Controller for user login
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.send('User does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send('Invalid password.');
    }

    req.session.user = user;
    res.redirect('/welcome');
  } catch (error) {
    console.error(error);
    res.send('An error occurred during login.');
  }
}

// Controller for user logout
async function logoutUser(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
    }
    res.redirect('/');
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
