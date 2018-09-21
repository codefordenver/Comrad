import axios from 'axios';
import { EVENT_GET, EVENT_ERROR } from './types';



export const getEvent = () => async dispatch => {
  try {
    const response = await axios.get('/api/event');

    dispatch({ type: EVENT_GET, payload: response.data });

  } catch (e) {
    dispatch({ type: EVENT_ERROR, payload: 'Get Event Error' });
  }

};
