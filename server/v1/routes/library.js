const router = require('express').Router();
const { libraryController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Library', 'readAny'), libraryController.findAll)
  .post(requireAC('Library', 'createAny'), libraryController.create);

router
  .route('/many')
  .post(requireAC('Library', 'createAny'), libraryController.createMany);

router
  .route('/search')
  .get(requireAC('Library', 'readAny'), libraryController.search);

// router
//   .route('/search-itunes')
//   .get(requireAC('Library', 'readAny'), libraryController.searchItunes);

router
  .route('/:id')
  .get(requireAC('Library', 'readAny'), libraryController.findById)
  .put(requireAC('Library', 'updateAny'), libraryController.update)
  .delete(requireAC('Library', 'deleteAny'), libraryController.remove);

module.exports = router;
