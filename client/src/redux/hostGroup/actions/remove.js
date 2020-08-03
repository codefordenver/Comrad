import { hostGroupAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const remove = (id, callback, errorCallback) => async dispatch => {
  try {
    const removedEntity = await hostGroupAPI.remove(id);

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
        body:
          typeof e.response.data.errorMessage == 'object'
            ? 'A server error occurred, please try again'
            : e.response.data.errorMessage,
      },
    });
    if (typeof errorCallback === 'function') {
      errorCallback();
    }
  }
};
