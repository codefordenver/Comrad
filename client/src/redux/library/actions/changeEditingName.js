import { libraryTypes } from '../libraryTypes';

export const changeEditingName = value => async dispatch => {
  dispatch({
    type: libraryTypes.EDITING_NAME,
    payload: { editingName: value },
  });
};
