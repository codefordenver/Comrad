import { USER_FIND_ONE, USER_ADD, USER_ERROR } from '../actions/types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_ADD:
      return {
        ...payload,
      };
    case USER_ERROR:
      return {
        ...payload,
      };
    default:
      return state;
  }
};
