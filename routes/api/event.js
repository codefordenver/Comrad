const router = require('express').Router();
const eventController = require('../../controllers/eventController');

router.route('/')
  .get(eventController.EXAMPLE)
  .post(eventController.create);

//.get(eventController.findAll)

router.route('/:id')
  .get(eventController.findById)
  .put(eventController.update)
  .delete(eventController.remove);

module.exports = router;