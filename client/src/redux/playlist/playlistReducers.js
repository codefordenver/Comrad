import { playlistTypes } from './playlistTypes';

const initialState = {
  doc: {},
  loading: false,
  saving: false,
};

export const playlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case playlistTypes.ADD_COMMENT_TO_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: [...state.doc.saved_items, payload.comment],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.ADD_COMMENT_TO_SCRATCHPAD:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: [...state.doc.scratchpad, payload.comment],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.DELETE_ITEM_FROM_SCRATCHPAD:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: state.doc.scratchpad.filter(
              item => item._id !== payload.deletedItem,
            ),
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.FIND_ONE:
      return {
        ...state,
        doc: payload,
        loading: false,
      };
    case playlistTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case playlistTypes.MOVE_ITEM_FROM_SAVED_ITEMS_TO_SCRATCHPAD:
      if (state.doc._id === payload.playlistId) {
        let newScratchpad = [...state.doc.scratchpad];
        if (typeof payload.movedItem !== 'undefined') {
          newScratchpad.push(payload.movedItem);
        }
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: newScratchpad,
            saved_items: state.doc.saved_items.filter(
              item => item._id !== payload.movedItem._id,
            ),
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.SAVING:
      return {
        ...state,
        saving: true,
      };
    default:
      return state;
  }
};
