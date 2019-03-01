import { SET_MODAL_VISIBILITY, MODAL_ERROR } from './modalTypes';

export const setModalVisibility = (
  modalType,
  modalVisibility,
  data,
) => async dispatch => {
  try {
    dispatch({
      type: SET_MODAL_VISIBILITY,
      payload: { modalType, modalVisibility, data },
    });
  } catch (e) {
    dispatch({ type: MODAL_ERROR, payload: 'Error Opening Modal' });
  }
};
