const router = require('express').Router();
const { user } = require('../../controllers/v1');

router
  .route('/')
  .get(user.findAll)
  .post(user.create);

router.route('/random').post(user.randomUser);
router.route('/search').get(user.search);

router
  .route('/:id')
  .get(user.findById)
  .put(user.update)
  .delete(user.remove);

router.route('/:id/permission').put(user.updatePermission);

module.exports = router;
