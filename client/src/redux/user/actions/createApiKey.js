import { alertTypes } from '../../alert/alertTypes';
import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const createApiKey = values => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });
    const { data: doc } = await userAPI.createApiKey(values);

    console.log(doc);

    const alert = {
      body: `New API Key ${doc.api_key}`,
      header: 'SUCCESS',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, paylaod: alert });
    dispatch({ type: userTypes.CREATE_API_KEY });
  } catch (err) {
    console.log(err);
  }
};
