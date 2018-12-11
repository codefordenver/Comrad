const router = require('express').Router();
const giveawayController = require('../../controllers/giveawayController');

router
  .route('/')
  .get(giveawayController.findAll)
  .post(giveawayController.create);

router
  .route('/:id')
  .get(giveawayController.findById)
  .put(giveawayController.update)
  .delete(giveawayController.remove);

module.exports = router;
