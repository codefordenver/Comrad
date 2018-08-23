const router = require('express').Router();
const ticketController = require('../../controllers/ticketController');

router.route('/')
  .get(ticketController.findAll)
  .post(ticketController.create);

router.route('/:id')
  .get(ticketController.findById)
  .put(ticketController.update)
  .delete(ticketController.remove);

module.exports = router;