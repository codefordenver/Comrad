const router = require('express').Router();
const { hostGroupsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('HostGroups', 'readAny'), hostGroupsController.find)
  .post(requireAC('HostGroups', 'createAny'), hostGroupsController.create);

router
  .route('/all')
  .get(requireAC('HostGroups', 'readAny'), hostGroupsController.findAll);

router
  .route('/:id')
  .get(requireAC('HostGroups', 'readAny'), hostGroupsController.findById)
  .delete(requireAC('HostGroups', 'updateAny'), hostGroupsController.remove)
  .put(requireAC('HostGroups', 'updateAny'), hostGroupsController.update);

module.exports = router;
