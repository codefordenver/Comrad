import { alertTypes } from '../../alert/alertTypes';
import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const createApiKey = userId => async dispatch => {
  try {
    const { data } = await userAPI.createApiKey(userId);

    const alert = {
      body: `New API Key --> ${data.api_key}`,
      header: 'SUCCESS',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
    dispatch({ type: userTypes.CREATE_API_KEY, payload: { doc: data.doc } });
  } catch (err) {
    console.log(err);
  }
};
