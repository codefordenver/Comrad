const router = require('express').Router();
const { genresController } = require('../controllers');
const { requireAC } = require('../middlewares');

router.route('/').get(requireAC('Genres', 'readAny'), genresController.findAll);

module.exports = router;
