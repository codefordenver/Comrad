import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { addTrackToSavedItems } from './addTrackToSavedItems';
import { addTrackToScratchpad } from './addTrackToScratchpad';
import { addTrafficToSavedItems } from './addTrafficToSavedItems';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { moveItemFromScratchpadToSavedItems } from './moveItemFromScratchpadToSavedItems';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';

export const playlistAPI = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  addTrackToSavedItems,
  addTrackToScratchpad,
  addTrafficToSavedItems,
  deleteItemFromScratchpad,
  moveItemFromSavedItemsToScratchpad,
  moveItemFromScratchpadToSavedItems,
  findOne,
  findOrCreateOne,
};
