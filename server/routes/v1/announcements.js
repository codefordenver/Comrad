const router = require('express').Router();
const { announcements } = require('../../controllers/v1');

router
  .route('/')
  .get(announcements.findAll)
  .post(announcements.create);

router
  .route('/:id')
  .get(announcements.findById)
  .put(announcements.update)
  .delete(announcements.remove);

module.exports = router;
