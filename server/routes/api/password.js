const router = require('express').Router();
const passwordController = require('../../controllers/passwordController');

router.route('/request').put(passwordController.requestReset);

router.route('/reset').put(passwordController.resetPassword);

module.exports = router;
