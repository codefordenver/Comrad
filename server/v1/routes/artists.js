const router = require('express').Router();
const { artistsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Artists', 'readAny'), artistsController.findAll)
  .post(requireAC('Artists', 'createAny'), artistsController.create);

router
  .route('/search')
  .get(requireAC('Artists', 'readAny'), artistsController.search);

router
  .route('/:id')
  .get(requireAC('Artists', 'readAny'), artistsController.findById)
  .put(requireAC('Artists', 'updateAny'), artistsController.update)
  .delete(requireAC('Artists', 'removeAny'), artistsController.remove);

router
  .route('/:id/albums')
  .get(requireAC('Artists', 'readAny'), artistsController.findArtistAlbums);

router
  .route('/many')
  .post(requireAC('Artists', 'createAny'), artistsController.createMany);

module.exports = router;
