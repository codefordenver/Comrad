const router = require('express').Router();
const { libraryController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Library', 'readAny'), libraryController.findAll);

router
  .route('/album')
  .get(requireAC('Library', 'readAny'), libraryController.findAllAlbums);

router
  .route('/artist')
  .get(requireAC('Library', 'readAny'), libraryController.findAllArtists);

router
  .route('/track')
  .get(requireAC('Library', 'readAny'), libraryController.findAllTracks);

router
  .route('/search')
  .get(requireAC('Library', 'readAny'), libraryController.search);

module.exports = router;
