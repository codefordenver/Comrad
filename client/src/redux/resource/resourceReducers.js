import { resourceTypes } from './resourceTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
};

export const resourceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case resourceTypes.ADD:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case resourceTypes.FIND_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case resourceTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case resourceTypes.REMOVE:
      let docs = state.docs;
      docs = docs.filter(a => a._id !== payload.doc._id);
      return {
        ...state,
        docs: docs,
        loading: false,
      };

    case resourceTypes.SEARCH:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case resourceTypes.UPDATE:
      let updateDocs = state.docs;
      for (let i = 0; i < updateDocs.length; i++) {
        if (updateDocs[i]._id === payload._id) {
          updateDocs[i] = payload;
        }
      }
      return {
        ...state,
        docs: updateDocs,
        loading: false,
      };

    default:
      return state;
  }
};
