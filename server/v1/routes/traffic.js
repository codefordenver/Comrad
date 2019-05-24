const router = require('express').Router();
const { trafficController } = require('../controllers');

router
  .route('/')
  .get(trafficController.findAll)
  .post(trafficController.create);

router
  .route('/:id')
  .get(trafficController.findById)
  .put(trafficController.update)
  .delete(trafficController.remove);

router.route('/search').post(trafficController.search);

module.exports = router;
