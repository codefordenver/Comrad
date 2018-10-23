const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/')
  .get(userController.findAll)
  .post(userController.create);

router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Permission Updates
router.route('/permission/:id')
  .put(userController.updatePermission);

module.exports = router;