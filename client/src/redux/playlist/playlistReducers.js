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
    case playlistTypes.ADD_TRACK_TO_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: [...state.doc.saved_items, payload.track],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.ADD_TRACK_TO_SCRATCHPAD:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: [...state.doc.scratchpad, payload.track],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.ADD_TRAFFIC_TO_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: [...state.doc.saved_items, payload.trafficItem],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.ADD_VOICE_BREAK_TO_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: [...state.doc.saved_items, payload.voice_break],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.ADD_VOICE_BREAK_TO_SCRATCHPAD:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: [...state.doc.scratchpad, payload.voice_break],
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.DELETE_ITEM_FROM_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: state.doc.saved_items.filter(
              item => item._id !== payload.deletedItem,
            ),
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
    case playlistTypes.MOVE_ITEM_FROM_SCRATCHPAD_TO_SAVED_ITEMS:
      if (state.doc._id === payload.playlistId) {
        let newSavedItems = [...state.doc.saved_items];
        if (typeof payload.movedItem !== 'undefined') {
          newSavedItems.push(payload.movedItem);
        }
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: newSavedItems,
            scratchpad: state.doc.scratchpad.filter(
              item => item._id !== payload.movedItem._id,
            ),
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.REARRANGE_SAVED_ITEM:
      if (state.doc._id === payload.playlistId) {
        let newSavedItems = [...state.doc.saved_items];
        let element = state.doc.saved_items[payload.fromIndex];
        newSavedItems.splice(payload.fromIndex, 1);
        newSavedItems.splice(payload.toIndex, 0, element);
        return {
          ...state,
          doc: {
            ...state.doc,
            saved_items: newSavedItems,
          },
          saving: false,
        };
      } else {
        return state;
      }
    case playlistTypes.REARRANGE_SCRATCHPAD_ITEM:
      if (state.doc._id === payload.playlistId) {
        let newScratchpad = [...state.doc.scratchpad];
        let element = state.doc.scratchpad[payload.fromIndex];
        newScratchpad.splice(payload.fromIndex, 1);
        newScratchpad.splice(payload.toIndex, 0, element);
        return {
          ...state,
          doc: {
            ...state.doc,
            scratchpad: newScratchpad,
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
    case playlistTypes.UPDATE_SCRATCHPAD_ITEM:
      if (state.doc._id === payload.playlistId) {
        let newScratchpad = [...state.doc.scratchpad];
        let itemIndex;
        state.doc.scratchpad.forEach((elem, idx) => {
          if (elem._id === payload.itemId) {
            itemIndex = idx;
          }
        });
        if (typeof itemIndex === 'undefined') {
          console.error(
            "in UPDATE_SCRATCHPAD_ITEM reducer, could not find the item's index in scratchpad",
          );
        } else {
          newScratchpad[itemIndex] = {
            ...newScratchpad[itemIndex],
            ...payload.propertiesToUpdate,
          };
          return {
            ...state,
            doc: {
              ...state.doc,
              scratchpad: newScratchpad,
            },
          };
        }
      }
      break;
    default:
      return state;
  }
};
