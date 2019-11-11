import { alertTypes } from '../../alert';
import { trafficAPI } from '../../../api';

export const add = (newTraffic, callback) => async dispatch => {
  try {
    const response = await trafficAPI.add(newTraffic);
    callback(response);
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
