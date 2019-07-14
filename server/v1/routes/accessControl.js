const router = require('express').Router();
const { accessControlController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC(), accessControlController.findAll)
  .post(accessControlController.create);

module.exports = router;
