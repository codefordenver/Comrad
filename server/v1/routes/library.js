const router = require('express').Router();
const { libraryController } = require('../controllers');

router
  .route('/')
  .get(libraryController.findAll)
  .post(libraryController.create);

router.route('/many').post(libraryController.createMany);

router.route('/search').get(libraryController.search);

router
  .route('/:id')
  .get(libraryController.findById)
  .put(libraryController.update)
  .delete(libraryController.remove);

module.exports = router;
