const router = require('express').Router();
const { tracksController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Tracks', 'readAny'), tracksController.findAll)
  .post(requireAC('Tracks', 'createAny'), tracksController.create);

router
  .route('/search')
  .get(requireAC('Tracks', 'readAny'), tracksController.search);

router
  .route('/many')
  .post(requireAC('Tracks', 'createAny'), tracksController.createMany);

router
  .route('/:id')
  .get(requireAC('Tracks', 'readAny'), tracksController.findById)
  .put(requireAC('Tracks', 'updateAny'), tracksController.update)
  .delete(requireAC('Tracks', 'deleteAny'), tracksController.remove);

module.exports = router;
