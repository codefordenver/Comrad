const router = require('express').Router();
const { artists } = require('../../controllers/v1');

router
  .route('/')
  .get(artists.findAll)
  .post(artists.create);

router.route('/search').get(artists.search);

router
  .route('/:id')
  .get(artists.findById)
  .put(artists.update)
  .delete(artists.remove);

router.route('/:id/albums').get(artists.findArtistAlbums);

router.route('/many').post(artists.createMany);

module.exports = router;
