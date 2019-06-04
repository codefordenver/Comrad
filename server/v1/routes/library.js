const router = require('express').Router();
const { libraryController } = require('../controllers');

router.route('/').get(libraryController.findAll);

router.route('/search').get(libraryController.search);

module.exports = router;
