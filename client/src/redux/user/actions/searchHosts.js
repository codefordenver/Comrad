import { userAPI } from '../../../api';
import { alertTypes } from '../../alert';
import { userTypes } from '../userTypes';

export const searchHosts = ({ filter, q }) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: docs } = await userAPI.searchHosts({ filter, q });
    const search = { filter, q };

    dispatch({ type: userTypes.SEARCH_HOSTS, payload: { docs, search } });
  } catch (e) {
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        display: true,
        header: 'ERROR',
        message: 'Error With Searching For Users',
        type: 'danger',
      },
    });
  }
};
