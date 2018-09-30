import { EVENT_GET, EVENT_POST, EVENT_ERROR } from "../actions/types";

const initialState = {
  status: "fetching",
  errorMessage: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case EVENT_GET:
      return {
        ...payload,
        status: true,
        errorMessage: null
      };

    case EVENT_POST:
      return {
        ...payload,
        status: true,
        errorMessage: null
      };

    //Need some type of error response from server.
    case EVENT_ERROR:
      return {
        ...state,
        status: "ERROR",
        errorMessage: payload
      };

    default:
      return state;
  }
}
