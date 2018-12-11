const router = require('express').Router();
const searchController = require('../../controllers/searchController');

router.route('/library').post(searchController.searchLibrary);

router.route('/users').post(searchController.searchUsers);

module.exports = router;
