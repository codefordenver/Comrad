import { alertTypes } from '../../alert';
import { trafficAPI } from '../../../api';

export const createInstance = (
  seriesId,
  instanceData,
  callback,
) => async dispatch => {
  try {
    const response = await trafficAPI.createInstance(seriesId, instanceData);
    if (typeof callback === 'function') {
      callback(response.data[0]);
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
