const router = require('express').Router();
const { playlistsController } = require('../controllers');

router.route('/').get(playlistsController.findOne);
router.route('/').put(playlistsController.findOrCreateOne);

router
  .route('/:playlistId/saved-items/comment')
  .put(playlistsController.addCommentToSavedItems);
router
  .route('/:playlistId/saved-items/traffic')
  .put(playlistsController.addTrafficToSavedItems);
router
  .route('/:playlistId/saved-items/:itemId')
  .delete(playlistsController.moveItemFromSavedItemsToScratchpad);

router
  .route('/:playlistId/scratchpad')
  .put(playlistsController.moveItemFromScratchpadToSavedItems);
router
  .route('/:playlistId/scratchpad/comment')
  .put(playlistsController.addCommentToScratchpad);
router
  .route('/:playlistId/scratchpad/:itemId')
  .delete(playlistsController.deleteItemFromScratchpad);

module.exports = router;
