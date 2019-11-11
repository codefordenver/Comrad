import { alertTypes } from '../../alert';
import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

/* limit is optional, and if provided, is applied to the search results (it's not applied to find all results) */
export const search = searchString => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOADING_SEARCH });

    let apiResponse = await trafficAPI.search(searchString);

    let docs = apiResponse.data;
    let payload = { docs, searchString };

    dispatch({
      type: trafficTypes.SEARCH,
      payload: payload,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: err.response.data.errorMessage,
      },
    });
  }
};
