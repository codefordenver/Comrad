import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';

export const playlistAPI = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  deleteItemFromScratchpad,
  moveItemFromSavedItemsToScratchpad,
  findOne,
  findOrCreateOne,
};
