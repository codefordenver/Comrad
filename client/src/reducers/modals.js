import { SET_MODAL_VISIBILITY } from '../actions/types';

const initialState = [];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_MODAL_VISIBILITY:
      return {
        ...payload,
      };
    default:
      return state;
  }
}

export function getModalType(state) {
  return state.modalType;
}

export function getModalVisibility(state) {
  return state.modalVisibility;
}

export function getModalData(state) {
  return state.data;
}