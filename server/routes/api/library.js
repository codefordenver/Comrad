const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');

router.route('/').get(libraryController.findAll);
router.route('/search').get(libraryController.searchLibrary);

module.exports = router;
