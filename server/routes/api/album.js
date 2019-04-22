const router = require('express').Router();
const albumController = require('../../controllers/albumController');

router
  .route('/')
  .get(albumController.findAll)
  .post(albumController.create);

router
  .route('/:id')
  .get(albumController.findById)
  .put(albumController.update)
  .delete(albumController.remove);

router.route('/:id/tracks').get(albumController.findTracks);

router.route('/search').post(albumController.search);

router.route('/many').post(albumController.createMany);

module.exports = router;
