const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/')
  .get(requireLogin, userController.findAll)
  .post(userController.create);

router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;