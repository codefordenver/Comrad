const router = require('express').Router();
const { announcementsController } = require('../controllers');

router
  .route('/')
  .get(announcementsController.findAll)
  .post(announcementsController.create);

router
  .route('/:id')
  .get(announcementsController.findById)
  .put(announcementsController.update)
  .delete(announcementsController.remove);

module.exports = router;
