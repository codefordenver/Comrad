import {
  MESSAGE_UPDATE,
  //USER_FIND_ONE,
  USER_ADD,
  USER_CLEAR,
  USER_ERROR,
  USER_LOADING,
} from '../actions/types';

const initialState = {
  data: [],
  loading: false,
  message: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_ADD:
      return {
        ...payload,
      };
    case USER_CLEAR:
      return {
        ...initialState,
      };
    case USER_ERROR:
      return {
        ...payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
