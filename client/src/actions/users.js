import axios from 'axios';
import { USERS_CLEAR, USERS_ERROR, USERS_LOADING, USERS_SEARCH } from './types';

export const usersAll = input => async dispatch => {
  try {
    const response = await axios.get(`/api/user`);

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const usersClear = () => async dispatch => {
  try {
    dispatch({ type: USERS_CLEAR });
  } catch (e) {
    console.log(e);
  }
};

export const usersSearch = input => async dispatch => {
  try {
    dispatch({ type: USERS_LOADING });

    const { q } = input;
    let url = `/api/user/search?q=`;

    q && (url += `${q}`);

    const response = await axios.get(url);

    if (q === 'TestErrorMessage') {
      dispatch({
        type: USERS_ERROR,
        payload: {
          error:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae quam volutpat, pellentesque neque eget, ornare magna.',
        },
      });
    }

    dispatch({ type: USERS_SEARCH, payload: { q, docs: [...response.data] } });
  } catch (e) {
    console.log(e);
  }
};
