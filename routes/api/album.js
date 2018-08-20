const router = require('express').Router();
const albumController = require('../../controllers/albumController');

router.route('/')
  .get(albumController.findAll)
  .post(albumController.create);

router.route('/:id')
  .get(albumController.findById)
  .put(albumController.update)
  .delete(albumController.remove);

module.exports = router;