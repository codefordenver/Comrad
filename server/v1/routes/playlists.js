const router = require('express').Router();
const { playlistsController } = require('../controllers');

router.route('/').get(playlistsController.findOne);

module.exports = router;
