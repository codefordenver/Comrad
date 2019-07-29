import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { addTrafficToSavedItems } from './addTrafficToSavedItems';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { moveItemFromScratchpadToSavedItems } from './moveItemFromScratchpadToSavedItems';

export const playlistActions = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  addTrafficToSavedItems,
  deleteItemFromScratchpad,
  findOne,
  findOrCreateOne,
  moveItemFromSavedItemsToScratchpad,
  moveItemFromScratchpadToSavedItems,
};
