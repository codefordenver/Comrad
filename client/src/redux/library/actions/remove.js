import { libraryAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const remove = (id, callback, errorCallback) => async dispatch => {
  try {
    const removedEntity = await libraryAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedEntity);
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
    if (typeof errorCallback === 'function') {
      errorCallback();
    }
  }
};
