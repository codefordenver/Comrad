import { hostGroupTypes } from '../hostGroupTypes';
import { hostGroupAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const findAll = callback => async dispatch => {
  try {
    dispatch({ type: hostGroupTypes.LOADING });

    const { data: docs } = await hostGroupAPI.findAll();

    dispatch({ type: hostGroupTypes.FIND_ALL, payload: docs });
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
