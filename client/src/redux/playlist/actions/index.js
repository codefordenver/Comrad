import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';

export const playlistActions = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  deleteItemFromScratchpad,
  findOne,
  findOrCreateOne,
  moveItemFromSavedItemsToScratchpad,
};
