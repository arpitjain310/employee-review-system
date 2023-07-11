const User = require('../models/user');
const Review = require('../models/review');

// Rendering the assignwork page
async function assignWorkPage(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  try {
    const users = await User.find({}, 'name');

    res.render('assignWork', { users });
  } catch (error) {
    console.error(error);
    res.send('An error occurred while fetching users.');
  }
}

// Handling the assignment work to a user
async function assignWork(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  const { assignedTo, assignedFor } = req.body;

  try {
    await Review.create({ assignedTo, assignedFor, state: 'open', comment: '' });
    res.redirect('/assignWork');
  } catch (error) {
    console.error(error);
    res.send('An error occurred while assigning work.');
  }
}

module.exports = {
  assignWorkPage,
  assignWork
};
