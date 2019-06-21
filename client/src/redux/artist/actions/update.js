import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';

import { SubmissionError } from 'redux-form';

export const update = ({ _id, ...rest }, callback) => async dispatch => {
  try {
    const response = await artistAPI.update(_id, rest);

    dispatch({ type: artistTypes.UPDATE, payload: response.data });

    callback();
  } catch (err) {
    dispatch({
      type: artistTypes.ALERT,
      payload: {
        header: 'Error',
        message: 'Artist Update Did Not Succeed',
        type: 'danger',
      },
    });
    throw new SubmissionError({});
  }
};
