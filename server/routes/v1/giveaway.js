const router = require('express').Router();
const { giveaway } = require('../../controllers/v1');

router
  .route('/')
  .get(giveaway.findAll)
  .post(giveaway.create);

router
  .route('/:id')
  .get(giveaway.findById)
  .put(giveaway.update)
  .delete(giveaway.remove);

module.exports = router;
