import { SET_MODAL_VISIBILITY } from './modalTypes';

const initialState = [];

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MODAL_VISIBILITY:
      if (
        state.onModalCloseCallback != null &&
        state.modalVisibility &&
        payload.modalVisibility === false
      ) {
        state.onModalCloseCallback();
      }
      return {
        ...payload,
      };
    default:
      return state;
  }
};

export function getModalType(state = initialState) {
  return state.modalType;
}

export function getModalVisibility(state = initialState) {
  return state.modalVisibility;
}

export function getModalData(state = initialState) {
  return state.data;
}
