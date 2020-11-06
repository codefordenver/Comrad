import { add } from './add';
import { clear } from './clear';
import { createInstance } from './createInstance';
import { find } from './find';
import { findEarliest } from './findEarliest';
import { findById } from './findById';
import { remove } from './remove';
import { removeInstanceFromSeries } from './removeInstanceFromSeries';
import { search } from './search';
import { searchUnderwriters } from './searchUnderwriters';
import { setReturnPageAfterAddDeleteActions } from './setReturnPageAfterAddDeleteActions';
import { update } from './update';

export const trafficActions = {
  add,
  clear,
  createInstance,
  find,
  findById,
  findEarliest,
  remove,
  removeInstanceFromSeries,
  search,
  searchUnderwriters,
  setReturnPageAfterAddDeleteActions,
  update,
};
