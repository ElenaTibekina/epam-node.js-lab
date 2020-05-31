const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const passport = require('passport');
const authRoute = require('./authRoute');
const router = express.Router();

router.use('/auth', passport.authenticate('local', { session: false }), authRoute);

router.post('/signup', authController.signup);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
