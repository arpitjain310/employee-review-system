const User = require('../models/user');

//Rendering the employee management page
async function employeeManagementPage(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  try {
    const users = await User.find({}, 'name email password userType');

    res.render('employeeManagement', { users });
  } catch (error) {
    console.error(error);
    res.send('An error occurred while fetching users.');
  }
}

// Handling the updation of user's details
async function updateUser(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  const { userId, name, email, userType } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { name, email, userType });
    res.redirect('/employeeManagement');
  } catch (error) {
    console.error(error);
    res.send('An error occurred while updating user.');
  }
}

// Deleting the user
async function deleteUser(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  const { userId } = req.body;

  try {
    await User.findByIdAndRemove(userId);
    res.redirect('/employeeManagement');
  } catch (error) {
    console.error(error);
    res.send('An error occurred while deleting user.');
  }
}

//Adding the user
async function addUser(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  const { name, email, password, userType } = req.body;

  try {
    const newUser = await User.create({ name, email, password, userType });
    console.log('New user created:', newUser);
    res.redirect('/employeeManagement');
  } catch (error) {
    console.error(error);
    res.send('An error occurred while adding a new user.');
  }
}

module.exports = {
  employeeManagementPage,
  updateUser,
  deleteUser,
  addUser
};
