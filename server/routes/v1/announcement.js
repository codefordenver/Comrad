const router = require('express').Router();
const { announcement } = require('../../controllers/v1');

router
  .route('/')
  .get(announcement.findAll)
  .post(announcement.create);

router
  .route('/:id')
  .get(announcement.findById)
  .put(announcement.update)
  .delete(announcement.remove);

module.exports = router;
