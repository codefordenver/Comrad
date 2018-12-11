const router = require('express').Router();
const artistController = require('../../controllers/artistController');

router
  .route('/')
  .get(artistController.findAll)
  .post(artistController.create);

router
  .route('/:id')
  .get(artistController.findById)
  .put(artistController.update)
  .delete(artistController.remove);

router.route('/many').post(artistController.createMany);

module.exports = router;
