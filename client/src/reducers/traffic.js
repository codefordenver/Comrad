import { TRAFFIC_GET, TRAFFIC_POST, TRAFFIC_UPDATE, TRAFFIC_DELETE, TRAFFIC_ERROR } from "../actions/types";

const initialState = [
  {
    id: 0,
    title: "Traffic Event 1",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 2
  },
  {
    id: 1,
    title: "Traffic Event 2",
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Traffic Event 3",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 2
  },
  {
    id: 11,
    title: "Traffic Event 4",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 2
  }
];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case TRAFFIC_GET:
      return {
        payload
      };

    case TRAFFIC_POST:
      const updatedState = state.concat(payload);
      return updatedState

    case TRAFFIC_UPDATE:
      const {existingTraffic, updatedTraffic} = payload;
      const {start, end} = updatedTraffic;

      const nextTraffic = state.map(stateTraffic => {
        return stateTraffic.id === existingTraffic.id
          ? { ...stateTraffic, start, end }
          : stateTraffic;
      });
      return nextTraffic

    //Need some type of error response from server.
    case TRAFFIC_ERROR:
      return {
        status: "ERROR",
        errorMessage: payload
      };

    default:
      return state;
  }
}
