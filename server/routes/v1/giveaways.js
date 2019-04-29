const router = require('express').Router();
const { giveaways } = require('../../controllers/v1');

router
  .route('/')
  .get(giveaways.findAll)
  .post(giveaways.create);

router
  .route('/:id')
  .get(giveaways.findById)
  .put(giveaways.update)
  .delete(giveaways.remove);

module.exports = router;
