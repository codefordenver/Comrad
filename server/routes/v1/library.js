const router = require('express').Router();
const { library } = require('../../controllers/v1');

router.route('/').get(library.findAll);
router.route('/album').get(library.findAllByAlbums);
router.route('/artist').get(library.findAllByArtists);
router.route('/track').get(library.findAllByTracks);

router.route('/search').get(library.search);

module.exports = router;
