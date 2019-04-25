const router = require('express').Router();
const { albums } = require('../../controllers/v1');

router
  .route('/')
  .get(albums.findAll)
  .post(albums.create);

router.route('/many').post(albums.createMany);
router.route('/search').get(albums.search);

router
  .route('/:id')
  .get(albums.findById)
  .put(albums.update)
  .delete(albums.remove);

router.route('/:id/tracks').get(albums.findTracks);

module.exports = router;
