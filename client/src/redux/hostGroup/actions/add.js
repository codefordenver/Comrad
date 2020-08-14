import { hostGroupTypes } from '../hostGroupTypes';
import { hostGroupAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const add = (values, callback) => async dispatch => {
  try {
    const { data: doc } = await hostGroupAPI.add(values);

    dispatch({ type: hostGroupTypes.ADD, payload: { doc } });

    callback(doc);
  } catch (e) {
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
