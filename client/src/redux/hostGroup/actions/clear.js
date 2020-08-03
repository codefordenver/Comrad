import { hostGroupTypes } from '../hostGroupTypes';

export const clear = () => async dispatch => {
  dispatch({ type: hostGroupTypes.CLEAR });
};
