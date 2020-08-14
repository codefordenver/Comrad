import { hostGroupTypes } from '../hostGroupTypes';
import { hostGroupAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const findById = id => async dispatch => {
  try {
    dispatch({ type: hostGroupTypes.FIND_BY_ID, payload: null });

    const { data: doc } = await hostGroupAPI.findById(id);

    dispatch({ type: hostGroupTypes.FIND_BY_ID, payload: doc });
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
