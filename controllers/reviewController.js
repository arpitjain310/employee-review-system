const Review = require('../models/review');

// Rendering the welcome page
async function welcomePage(req, res) {
  if (!req.session.user) {
    return res.redirect('/');
  }

  const loggedInUserId = req.session.user._id;

  try {
    const assignedReviews = await Review.find({ assignedTo: loggedInUserId, state: 'open' })
      .populate('assignedTo', 'name')
      .populate('assignedFor', 'name');

    const myReviews = await Review.find({ assignedTo: loggedInUserId, state: 'closed' })
      .populate('assignedTo', 'name')
      .populate('assignedFor', 'name');

    const user = req.session.user;
    res.render('welcome', { user, assignedReviews, myReviews });

  } catch (error) {
    console.error(error);
    res.send('An error occurred while fetching the reviews.');
  }
}

// Handling submission of review
async function submitReview(req, res) {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.redirect('/');
  }

  const { reviewId, comment } = req.body;

  try {
    await Review.findByIdAndUpdate(reviewId, { comment, state: 'closed' }, { new: true });
    res.redirect('/welcome');
  } catch (error) {
    console.error(error);
    res.send('An error occurred while submitting the review.');
  }
}

module.exports = {
  welcomePage,
  submitReview
};
