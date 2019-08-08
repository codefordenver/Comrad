import { genreTypes } from '../genreTypes';
import { genreAPI } from '../../../api';

export const findAll = () => async dispatch => {
  try {
    const response = await genreAPI.findAll();
    dispatch({ type: genreTypes.FIND_ALL, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
