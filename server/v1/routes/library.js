const router = require('express').Router();
const { libraryController } = require('../controllers');

router.route('/').get(libraryController.findAll);
router.route('/album').get(libraryController.findAllAlbums);
router.route('/artist').get(libraryController.findAllArtists);
router.route('/track').get(libraryController.findAllTracks);

router.route('/search').get(libraryController.search);

module.exports = router;
