const router = require('express').Router();
const { accessControlController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('AccessControl', 'readAny'), accessControlController.findAll)
  .post(
    requireAC('AccessControl', 'createAny'),
    accessControlController.create,
  );

module.exports = router;
