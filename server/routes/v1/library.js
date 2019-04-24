const router = require('express').Router();
const { library } = require('../../controllers/v1');

router.route('/').get(library.findAll);

router.route('/search').get(library.search);

module.exports = router;
