const router = require('express').Router();
const { accessControlController } = require('../controllers');

router
  .route('/')
  .get(accessControlController.findAll)
  .post(accessControlController.create);

module.exports = router;
