import { albumAPI } from '../../../api';
import { albumTypes } from '../albumTypes';
import { alertTypes } from '../../alert';

export const edit = (data, callback) => async dispatch => {
  try {
    const _id = data.id;
    const album = await albumAPI.update(data, _id);
    dispatch({ type: albumTypes.EDIT, payload: album.data });
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
