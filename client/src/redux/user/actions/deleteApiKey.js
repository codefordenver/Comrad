import { alertTypes } from '../../alert/alertTypes';
import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const deleteApiKey = userId => async dispatch => {
  try {
    const { data: doc } = await userAPI.deleteApiKey(userId);

    const alert = {
      body: `API KEY DELETED`,
      header: 'SUCCESS',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
    dispatch({
      type: userTypes.DELETE_API_KEY,
      payload: {
        doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
