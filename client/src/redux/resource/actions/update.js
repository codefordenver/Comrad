import { resourceTypes } from '../resourceTypes';
import { resourceAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const update = (data, callback) => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const _id = data._id;
    const doc = await resourceAPI.update(data, _id);

    dispatch({ type: resourceTypes.UPDATE, payload: { doc } });

    const alert = {
      body: 'Resource was successfully updated',
      header: 'Success',
      type: 'success',
    };

    if (typeof callback === 'function') {
      callback();
    }

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log('Resource Update', err);
  }
};
