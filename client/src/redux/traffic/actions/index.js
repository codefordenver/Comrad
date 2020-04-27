import { add } from './add';
import { clear } from './clear';
import { createInstance } from './createInstance';
import { deleteInstance } from './deleteInstance';
import { deleteSeries } from './deleteSeries';
import { find } from './find';
import { findEarliest } from './findEarliest';
import { findById } from './findById';
import { search } from './search';
import { searchUnderwriters } from './searchUnderwriters';
import { setReturnPageAfterAddDeleteActions } from './setReturnPageAfterAddDeleteActions';
import { updateInstance } from './updateInstance';
import { updateSeries } from './updateSeries';

export const trafficActions = {
  add,
  clear,
  createInstance,
  deleteInstance,
  deleteSeries,
  find,
  findById,
  findEarliest,
  search,
  searchUnderwriters,
  setReturnPageAfterAddDeleteActions,
  updateInstance,
  updateSeries,
};
