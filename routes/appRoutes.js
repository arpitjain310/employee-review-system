const express = require('express');
const router = express.Router();

//importing controllers
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
const assignmentController = require('../controllers/assignmentController');
const employeeController = require('../controllers/employeeController');

//basic rendering routes
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

//User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

//review routes
router.get('/welcome', reviewController.welcomePage);
router.post('/submitReview', reviewController.submitReview);

//workassignment routes
router.get('/assignWork', assignmentController.assignWorkPage);
router.post('/assignWork', assignmentController.assignWork);

//user management routes
router.get('/employeeManagement', employeeController.employeeManagementPage);
router.post('/updateUser', employeeController.updateUser);
router.post('/deleteUser', employeeController.deleteUser);
router.post('/addUser', employeeController.addUser);

module.exports = router;
