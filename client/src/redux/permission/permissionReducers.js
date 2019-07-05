import { permissionTypes } from './permissionTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
};

export const permissionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case permissionTypes.FIND_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case permissionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
