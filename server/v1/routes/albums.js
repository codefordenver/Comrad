const router = require('express').Router();
const { albumsController } = require('../controllers');

router
  .route('/')
  .get(albumsController.findAll)
  .post(albumsController.create);

router.route('/many').post(albumsController.createMany);
router.route('/search').get(albumsController.search);

router
  .route('/:id')
  .get(albumsController.findById)
  .put(albumsController.update)
  .delete(albumsController.remove);

router.route('/:id/tracks').get(albumsController.findTracks);

module.exports = router;
