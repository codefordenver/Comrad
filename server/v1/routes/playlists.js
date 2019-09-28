const router = require('express').Router();
const { playlistsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Playlist', 'readAny'), playlistsController.findOne);
router
  .route('/')
  .put(requireAC('Playlist', 'readAny'), playlistsController.findOrCreateOne); //this is readAny even though it can create records because creating a playlist record is required to view the playlist page: without update permissions, you can't change the playlist in any way (it will just be a blank playlist)
router
  .route('/:playlistId/saved-items')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.moveItemFromScratchpadToSavedItems,
  );
router
  .route('/:playlistId/saved-items/comment')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.addCommentToSavedItems,
  );
router
  .route('/:playlistId/saved-items/track')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.addTrackToSavedItems,
  );
router
  .route('/:playlistId/saved-items/traffic')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.addTrafficToSavedItems,
  );
router
  .route('/:playlistId/saved-items/:itemId/rearrange')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.rearrangeSavedItem,
  );
router
  .route('/:playlistId/saved-items/:itemId')
  .delete(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.moveItemFromSavedItemsToScratchpad,
  );

router
  .route('/:playlistId/scratchpad/comment')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.addCommentToScratchpad,
  );
router
  .route('/:playlistId/scratchpad/track')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.addTrackToScratchpad,
  );
router
  .route('/:playlistId/scratchpad/:itemId/rearrange')
  .put(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.rearrangeScratchpadItem,
  );
router
  .route('/:playlistId/scratchpad/:itemId')
  .delete(
    requireAC('Playlist', 'updateOwn'),
    playlistsController.deleteItemFromScratchpad,
  );

module.exports = router;
