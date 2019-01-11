import { SET_MODAL_VISIBILITY, MODAL_ERROR } from './types';

export const setModalVisibility = (
  modalType,
  modalVisibility,
) => async dispatch => {
  try {
    dispatch({
      type: SET_MODAL_VISIBILITY,
      payload: { modalType, modalVisibility },
    });
  } catch (e) {
    dispatch({ type: MODAL_ERROR, payload: 'Error Opening Modal' });
  }
};
