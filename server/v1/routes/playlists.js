const router = require('express').Router();
const { playlistsController } = require('../controllers');

router.route('/').get(playlistsController.findOne);
router.route('/').put(playlistsController.findOrCreateOne);

router
  .route('/:playlistId/saved-items/comment')
  .post(playlistsController.addCommentToSavedItems);
router
  .route('/:playlistId/saved-items/:itemId')
  .delete(playlistsController.moveItemFromSavedItemsToScratchpad);

router
  .route('/:playlistId/scratchpad/comment')
  .post(playlistsController.addCommentToScratchpad);
router
  .route('/:playlistId/scratchpad/:itemId')
  .delete(playlistsController.deleteItemFromScratchpad);

module.exports = router;
