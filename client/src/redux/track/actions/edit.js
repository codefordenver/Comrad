import { trackAPI } from '../../../api';
import { trackTypes } from '../trackTypes';
import { alertTypes } from '../../alert';

export const edit = (data, callback) => async dispatch => {
  try {
    const _id = data.id;
    const track = await trackAPI.update(data, _id);
    dispatch({ type: trackTypes.EDIT, payload: track.data });
    callback(data);
  } catch (e) {
    console.error(e);
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
