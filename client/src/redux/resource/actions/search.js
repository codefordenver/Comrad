import { resourceAPI } from '../../../api';
import { resourceTypes } from '../resourceTypes';

export const search = values => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const { data: docs } = await resourceAPI.search(values);

    dispatch({ type: resourceTypes.SEARCH, payload: { docs } });
  } catch (err) {
    console.log('Resource Search', err);
  }
};
