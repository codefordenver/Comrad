import { hostGroupTypes } from '../hostGroupTypes';
import { hostGroupAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const findByHosts = (hosts, callback) => async dispatch => {
  hosts = hosts.filter(h => h != null);

  if (hosts.length === 0) {
    dispatch({ type: hostGroupTypes.FOUND_BY_HOSTS, payload: [] });
    return;
  }

  try {
    dispatch({ type: hostGroupTypes.LOADING_BY_HOSTS });

    const { data: docs } = await hostGroupAPI.findByHosts(hosts);

    dispatch({ type: hostGroupTypes.FOUND_BY_HOSTS, payload: docs });
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
