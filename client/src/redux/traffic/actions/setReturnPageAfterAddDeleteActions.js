import { trafficTypes } from '../trafficTypes';

export const setReturnPageAfterAddDeleteActions = returnLocation => async dispatch => {
  dispatch({
    type: trafficTypes.ADD_DELETE_ACTION_RETURN_LOCATION,
    payload: returnLocation,
  });
};
