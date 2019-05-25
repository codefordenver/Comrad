const router = require('express').Router();
const { giveawaysController } = require('../controllers');

router
  .route('/')
  .get(giveawaysController.findAll)
  .post(giveawaysController.create);

router
  .route('/:id')
  .get(giveawaysController.findById)
  .put(giveawaysController.update)
  .delete(giveawaysController.remove);

module.exports = router;
