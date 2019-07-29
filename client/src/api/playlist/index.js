import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { addTrafficToSavedItems } from './addTrafficToSavedItems';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { moveItemFromScratchpadToSavedItems } from './moveItemFromScratchpadToSavedItems';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';

export const playlistAPI = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  addTrafficToSavedItems,
  deleteItemFromScratchpad,
  moveItemFromSavedItemsToScratchpad,
  moveItemFromScratchpadToSavedItems,
  findOne,
  findOrCreateOne,
};
