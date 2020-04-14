import { alertTypes } from '../../alert';
import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

export const searchUnderwriters = searchString => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOADING_SEARCH });

    let apiResponse = await trafficAPI.searchUnderwriters(searchString);

    let docs = apiResponse.data;
    let payload = { docs, searchString };

    dispatch({
      type: trafficTypes.SEARCH_UNDERWRITERS,
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
