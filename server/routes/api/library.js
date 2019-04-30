const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');

router.route('/').get(libraryController.findAll);
router.route('/album').get(libraryController.findAllByAlbums);
router.route('/artist').get(libraryController.findAllByArtists);
router.route('/track').get(libraryController.findAllByTracks);

router.route('/search').get(libraryController.searchLibrary);

module.exports = router;
