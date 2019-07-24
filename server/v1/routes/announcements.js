const router = require('express').Router();
const { announcementsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Announcements', 'readAny'), announcementsController.findAll)
  .post(
    requireAC('Announcements', 'createAny'),
    announcementsController.create,
  );

router
  .route('/:id')
  .get(requireAC('Announcements', 'readAny'), announcementsController.findById)
  .put(requireAC('Announcements', 'updateAny'), announcementsController.update)
  .delete(
    requireAC('Announcements', 'deleteAny'),
    announcementsController.remove,
  );

module.exports = router;
