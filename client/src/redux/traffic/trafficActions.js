import axios from 'axios';
import {
  TRAFFIC_GET,
  TRAFFIC_POST,
  TRAFFIC_UPDATE,
  TRAFFIC_DELETE,
  TRAFFIC_SEARCH,
  TRAFFIC_ERROR,
} from './trafficTypes';

export const getTraffic = traffic => async dispatch => {
  try {
    const response = await axios.get(`/v1/traffic/${traffic}`);

    dispatch({ type: TRAFFIC_GET, payload: response.data });
  } catch (e) {
    dispatch({ type: TRAFFIC_ERROR, payload: 'Get Traffic Error' });
  }
};

export const postTraffic = traffic => async dispatch => {
  try {
    console.log('Traffic Post Action: ' + traffic);

    dispatch({ type: TRAFFIC_POST, payload: traffic });
  } catch (e) {
    dispatch({ type: TRAFFIC_ERROR, payload: 'Posting New Traffic Error' });
  }
};

export const updateTraffic = (
  existingTraffic,
  updatedTraffic,
) => async dispatch => {
  try {
    console.log('Action: ' + updatedTraffic);

    dispatch({
      type: TRAFFIC_UPDATE,
      payload: { existingTraffic, updatedTraffic },
    });
  } catch (e) {
    dispatch({ type: TRAFFIC_ERROR, payload: 'Updating Traffic Error' });
  }
};

export const deleteTraffic = traffic => async dispatch => {
  try {
    console.log('Traffic Delete Action: ' + traffic);

    dispatch({ type: TRAFFIC_DELETE, payload: traffic });
  } catch (e) {
    dispatch({ type: TRAFFIC_ERROR, payload: 'Delete Traffic Error' });
  }
};

export const searchTraffic = traffic => async dispatch => {
  try {
    console.log('Traffic Search Action: ' + traffic);

    dispatch({ type: TRAFFIC_SEARCH, payload: traffic });
  } catch (e) {
    dispatch({ type: TRAFFIC_ERROR, payload: 'Search Traffic Error' });
  }
};
