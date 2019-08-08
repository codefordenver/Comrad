import { libraryTypes } from './libraryTypes';

const initialState = {
  docs: null,
  doc: null,
  editingName: false,
  error: false,
  loading: false,
};

export const libraryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case libraryTypes.ADD:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    case libraryTypes.CLEAR:
      return {
        ...initialState,
      };
    case libraryTypes.EDITING_NAME:
      return {
        ...state,
        editingName: payload.editingName,
      };
    case libraryTypes.FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case libraryTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case libraryTypes.UPDATE:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
