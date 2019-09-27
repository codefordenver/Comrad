import { alertTypes } from '../../alert/alertTypes';
import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const createApiKey = values => async dispatch => {
  try {
    const { data: doc } = await userAPI.createApiKey(values);

    console.log(doc);

    const alert = {
      body: `New API Key --> ${doc.api_key}`,
      header: 'SUCCESS',
      type: 'success',
    };

    console.log(alert);

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log(err);
  }
};
