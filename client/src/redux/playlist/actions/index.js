import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { addTrackToSavedItems } from './addTrackToSavedItems';
import { addTrackToScratchpad } from './addTrackToScratchpad';
import { addTrafficToSavedItems } from './addTrafficToSavedItems';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { moveItemFromScratchpadToSavedItems } from './moveItemFromScratchpadToSavedItems';
import { rearrangeSavedItem } from './rearrangeSavedItem';
import { rearrangeScratchpadItem } from './rearrangeScratchpadItem';

export const playlistActions = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  addTrackToSavedItems,
  addTrackToScratchpad,
  addTrafficToSavedItems,
  deleteItemFromScratchpad,
  findOne,
  findOrCreateOne,
  moveItemFromSavedItemsToScratchpad,
  moveItemFromScratchpadToSavedItems,
  rearrangeSavedItem,
  rearrangeScratchpadItem,
};
