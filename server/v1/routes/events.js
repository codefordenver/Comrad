const router = require('express').Router();
const { requireAC } = require('../middlewares');
const { eventsController } = require('../controllers');

// :type is either "shows" or "traffic"
router
  .route('/:eventType/')
  .get(requireAC(null, 'readAny'), eventsController.find)
  .post(requireAC(null, 'createAny'), eventsController.create);

router
  .route('/:eventType/by-custom-field')
  .get(requireAC(null, 'readAny'), eventsController.findByCustomField);

router
  .route('/:eventType/earliest')
  .get(requireAC(null, 'readAny'), eventsController.findEarliest);

router
  .route('/:eventType/search')
  .get(requireAC(null, 'readAny'), eventsController.search);

router
  .route('/:eventType/search-underwriters')
  .get(requireAC(null, 'readAny'), eventsController.searchUnderwriters);

router
  .route('/:eventType/:year-:month-:day')
  .get(requireAC(null, 'readAny'), eventsController.findByDateAndName);

router
  .route('/:eventType/:id')
  .get(requireAC(null, 'readAny'), eventsController.findById)
  .delete(requireAC(null, 'deleteAny'), eventsController.remove)
  .post(requireAC(null, 'updateOwn'), eventsController.createInstance)
  .put(requireAC(null, 'updateOwn'), eventsController.update);

router
  .route('/:eventType/:id/remove-instance-from-series')
  .delete(
    requireAC(null, 'deleteAny'),
    eventsController.removeInstanceFromSeries,
  );

module.exports = router;
