const router = require('express').Router();
const { users } = require('../../controllers/v1');

router
  .route('/')
  .get(users.findAll)
  .post(users.create);

router.route('/random').post(users.randomUser);
router.route('/search').get(users.search);
router.route('/search-hosts').get(users.searchHosts);

router
  .route('/:id')
  .get(users.findById)
  .put(users.update)
  .delete(users.remove);

router.route('/:id/permission').put(users.updatePermission);

module.exports = router;
