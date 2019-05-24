import { userAPI } from '../../../api';
import { userTypes } from '../userTypes';

export const searchHosts = ({ filter, q }) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: docs } = await userAPI.searchHosts({ filter, q });
    const search = { filter, q };

    dispatch({ type: userTypes.SEARCH_HOSTS, payload: { docs, search } });
  } catch (e) {
    const alert = {
      display: true,
      header: 'ERROR',
      message: 'Error With Searching For Users',
      type: 'danger',
    };

    dispatch({ type: userTypes.ALERT, payload: { alert } });
  }
};
