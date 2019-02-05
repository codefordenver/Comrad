const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');

router.route('/').get(libraryController.findAll);

module.exports = router;
