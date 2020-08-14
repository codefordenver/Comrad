import { hostGroupAPI } from '../../../api';
import { hostGroupTypes } from '../hostGroupTypes';
import { alertTypes } from '../../alert';

export const update = (id, data, callback) => async dispatch => {
  try {
    const hostGroupEntity = await hostGroupAPI.update(data, id);
    dispatch({ type: hostGroupTypes.UPDATE, payload: hostGroupEntity.data });
    callback(data);
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
