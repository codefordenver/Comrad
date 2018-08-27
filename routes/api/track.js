const router = require('express').Router();
const trackController = require('../../controllers/trackController');

router.route('/')
  .get(trackController.findAll)
  .post(trackController.create);

router.route('/:id')
  .get(trackController.findById)
  .put(trackController.update)
  .delete(trackController.remove);

module.exports = router;