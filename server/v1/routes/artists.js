const router = require('express').Router();
const { artistsController } = require('../controllers');

router
  .route('/')
  .get(artistsController.findAll)
  .post(artistsController.create);

router.route('/search').get(artistsController.search);

router
  .route('/:id')
  .get(artistsController.findById)
  .put(artistsController.update)
  .delete(artistsController.remove);

router.route('/:id/albums').get(artistsController.findArtistAlbums);

router.route('/many').post(artistsController.createMany);

module.exports = router;
