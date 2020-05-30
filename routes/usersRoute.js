const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`User id is: ${val}`);
  next();
});

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);

router
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;