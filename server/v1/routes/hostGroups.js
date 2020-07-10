const router = require('express').Router();
const { hostGroupsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('HostGroups', 'readAny'), hostGroupsController.find)
  .post(requireAC('HostGroups', 'createAny'), hostGroupsController.create);

module.exports = router;
