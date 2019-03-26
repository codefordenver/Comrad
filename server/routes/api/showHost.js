const router = require('express').Router({ mergeParams: true });
const showHostController = require('../../controllers/showHostController');

router.route('/').patch(showHostController.update);

module.exports = router;
