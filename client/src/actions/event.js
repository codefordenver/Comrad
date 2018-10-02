import axios from 'axios';
import { EVENT_GET, EVENT_POST, EVENT_UPDATE, EVENT_DELETE, EVENT_ERROR } from './types';

export const getEvent = () => async dispatch => {
  try {
    const response = await axios.get('/api/event');

    dispatch({ type: EVENT_GET, payload: response.data });

  } catch (e) {
    dispatch({ type: EVENT_ERROR, payload: 'Get Event Error' });
  }

};

export const postEvent = (event) => async dispatch => {
  try {
    console.log("Event Post Action: " + event);

    dispatch({ type: EVENT_POST, payload: event});

  } catch (e) {
    dispatch({ type: EVENT_ERROR, payload: 'Posting New Event Error' });
  }

};

export const updateEvent = (existingEvent, updatedEvent ) => async dispatch => {
  try {
    console.log("Action: " + updatedEvent);

    dispatch({ type: EVENT_UPDATE, payload: {existingEvent, updatedEvent }});

  } catch (e) {
    dispatch({ type: EVENT_ERROR, payload: 'Updating Event Error' });
  }

};
