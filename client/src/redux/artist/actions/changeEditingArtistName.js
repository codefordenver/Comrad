import { artistTypes } from '../artistTypes';

export const changeEditingArtistName = value => async dispatch => {
  dispatch({ type: artistTypes.EDITING_NAME, payload: { editingName: value } });
};
