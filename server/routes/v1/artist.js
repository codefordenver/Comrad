const router = require('express').Router();
const { artist } = require('../../controllers/v1');

router
  .route('/')
  .get(artist.findAll)
  .post(artist.create);

router.route('/search').get(artist.search);

router
  .route('/:id')
  .get(artist.findById)
  .put(artist.update)
  .delete(artist.remove);

router.route('/many').post(artist.createMany);

module.exports = router;
