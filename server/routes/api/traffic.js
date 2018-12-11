const router = require('express').Router();
const trafficController = require('../../controllers/trafficController');

router
  .route('/')
  .get(trafficController.EXAMPLE)
  .post(trafficController.create);

//.get(trafficController.findAll)

router
  .route('/:id')
  .get(trafficController.findById)
  .put(trafficController.update)
  .delete(trafficController.remove);

router.route('/search').post(trafficController.search);

module.exports = router;
