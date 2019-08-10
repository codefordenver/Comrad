const router = require('express').Router();
const { genresController } = require('../controllers');

router.route('/').get(genresController.findAll);

module.exports = router;
