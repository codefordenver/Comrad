import { resourceTypes } from '../resourceTypes';
import { resourceAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const add = (values, callback) => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const { data: doc } = await resourceAPI.add(values);

    dispatch({ type: resourceTypes.ADD, payload: { doc } });

    callback();

    const alert = {
      body: 'Policy was successfully added',
      header: 'Success',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log('Resource Add', err);
  }
};
