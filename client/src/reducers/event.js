import { EVENT_GET, EVENT_POST, EVENT_UPDATE, EVENT_DELETE, EVENT_ERROR } from "../actions/types";

const initialState = [
  {
    id: 0,
    title: "Event 1",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1
  },
  {
    id: 1,
    title: "Event 2",
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Event 3",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 1
  },
  {
    id: 11,
    title: "Event 4",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 2
  }
];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case EVENT_GET:
      return {
        payload
      };

    case EVENT_POST:
      const updatedState = state.concat(payload);
      return updatedState

    case EVENT_UPDATE:
      const {existingEvent, updatedEvent} = payload;
      const {start, end} = updatedEvent;

      const nextEvents = state.map(stateEvent => {
        return stateEvent.id === existingEvent.id
          ? { ...stateEvent, start, end }
          : stateEvent;
      });
      return nextEvents

    //Need some type of error response from server.
    case EVENT_ERROR:
      return {
        status: "ERROR",
        errorMessage: payload
      };

    default:
      return state;
  }
}
