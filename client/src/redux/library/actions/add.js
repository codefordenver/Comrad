import { libraryAPI } from '../../../api';
import { libraryTypes } from '../libraryTypes';
import { alertTypes } from '../../alert';

export const add = (type, input, callback) => async dispatch => {
  try {
    const addedEntity = await libraryAPI.add(type, input);
    dispatch({ type: libraryTypes.ADD, payload: addedEntity.data });
    if (typeof callback === 'function') {
      callback(addedEntity.data);
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: e.response.data.errorMessage,
      },
    });
  }
};
