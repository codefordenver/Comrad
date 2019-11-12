const router = require('express').Router();
const { playlistsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Playlists', 'readAny'), playlistsController.findOne);
router
  .route('/')
  .put(requireAC('Playlists', 'readAny'), playlistsController.findOrCreateOne); //this is readAny even though it can create records because creating a playlist record is required to view the playlist page: without update permissions, you can't change the playlist in any way (it will just be a blank playlist)
router
  .route('/:playlistId/saved-items')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.moveItemFromScratchpadToSavedItems,
  );
router
  .route('/:playlistId/saved-items/comment')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addCommentToSavedItems,
  );
router
  .route('/:playlistId/saved-items/track')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addTrackToSavedItems,
  );
router
  .route('/:playlistId/saved-items/traffic')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addTrafficToSavedItems,
  );
router
  .route('/:playlistId/saved-items/voice-break')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addVoiceBreakToSavedItems,
  );
router
  .route('/:playlistId/saved-items/:itemId/rearrange')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.rearrangeSavedItem,
  );
router
  .route('/:playlistId/saved-items/:itemId')
  .delete(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.moveItemFromSavedItemsToScratchpad,
  );

router
  .route('/:playlistId/scratchpad/comment')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addCommentToScratchpad,
  );
router
  .route('/:playlistId/scratchpad/track')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addTrackToScratchpad,
  );
router
  .route('/:playlistId/scratchpad/voice-break')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.addVoiceBreakToScratchpad,
  );
router
  .route('/:playlistId/scratchpad/:itemId/rearrange')
  .put(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.rearrangeScratchpadItem,
  );
router
  .route('/:playlistId/scratchpad/:itemId')
  .delete(
    requireAC('Playlists', 'updateOwn'),
    playlistsController.deleteItemFromScratchpad,
  );

module.exports = router;
