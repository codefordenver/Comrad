import { resourceTypes } from '../resourceTypes';
import { resourceAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const remove = values => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const { data: doc } = await resourceAPI.remove(values);

    dispatch({ type: resourceTypes.REMOVE, payload: { doc } });

    const alert = {
      body: 'Resource was successfully removed',
      header: 'Success',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log('Resource Remove', err);
  }
};
