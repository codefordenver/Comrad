import { addCommentToSavedItems } from './addCommentToSavedItems';
import { addCommentToScratchpad } from './addCommentToScratchpad';
import { addTrackToSavedItems } from './addTrackToSavedItems';
import { addTrackToScratchpad } from './addTrackToScratchpad';
import { addTrafficToSavedItems } from './addTrafficToSavedItems';
import { addVoiceBreakToSavedItems } from './addVoiceBreakToSavedItems';
import { addVoiceBreakToScratchpad } from './addVoiceBreakToScratchpad';
import { deleteItemFromScratchpad } from './deleteItemFromScratchpad';
import { moveItemFromSavedItemsToScratchpad } from './moveItemFromSavedItemsToScratchpad';
import { moveItemFromScratchpadToSavedItems } from './moveItemFromScratchpadToSavedItems';
import { findOne } from './findOne';
import { findOrCreateOne } from './findOrCreateOne';
import { rearrangeSavedItem } from './rearrangeSavedItem';
import { rearrangeScratchpadItem } from './rearrangeScratchpadItem';
import { updateScratchpadItem } from './updateScratchpadItem';

export const playlistAPI = {
  addCommentToSavedItems,
  addCommentToScratchpad,
  addTrackToSavedItems,
  addTrackToScratchpad,
  addTrafficToSavedItems,
  addVoiceBreakToSavedItems,
  addVoiceBreakToScratchpad,
  deleteItemFromScratchpad,
  moveItemFromSavedItemsToScratchpad,
  moveItemFromScratchpadToSavedItems,
  findOne,
  findOrCreateOne,
  rearrangeSavedItem,
  rearrangeScratchpadItem,
  updateScratchpadItem,
};
