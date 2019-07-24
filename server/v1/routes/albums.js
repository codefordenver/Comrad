const router = require('express').Router();
const { albumsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Albums', 'readAny'), albumsController.findAll)
  .post(requireAC('Albums', 'createAny'), albumsController.create);

router
  .route('/many')
  .post(requireAC('Albums', 'createAny'), albumsController.createMany);
router
  .route('/search')
  .get(requireAC('Albums', 'readAny'), albumsController.search);

router
  .route('/:id')
  .get(requireAC('Albums', 'readAny'), albumsController.findById)
  .put(requireAC('Albums', 'updateAny'), albumsController.update)
  .delete(requireAC('Albums', 'deleteAny'), albumsController.remove);

router
  .route('/:id/tracks')
  .get(requireAC('Albums', 'readAny'), albumsController.findTracks);

module.exports = router;
