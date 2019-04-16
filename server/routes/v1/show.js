const router = require('express').Router();
const { show } = require('../../controllers/v1');
const showHostController = require('../../controllers/showHostController');

router
  .route('/')
  .get(show.findByDate)
  .post(show.create);

router
  .route('/:id')
  .get(show.findById)
  .delete(show.remove);

router.route('/:id/host').patch(showHostController.update);

module.exports = router;
