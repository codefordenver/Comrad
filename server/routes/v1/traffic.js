const router = require('express').Router();
const { traffic } = require('../../controllers/v1');

router
  .route('/')
  .get(traffic.findAll)
  .post(traffic.create);

router
  .route('/:id')
  .get(traffic.findById)
  .put(traffic.update)
  .delete(traffic.remove);

router.route('/search').post(traffic.search);

module.exports = router;
