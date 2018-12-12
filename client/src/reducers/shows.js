import _ from 'lodash';
import { SHOW_GET, SHOW_POST, SHOW_UPDATE, SHOW_DELETE, SHOW_ERROR } from "../actions/types";

const initialState = null;

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_GET:
      return Object.assign({}, state, _.mapKeys(payload, "_id"));

    case SHOW_POST:
      return Object.assign({}, state, _.mapKeys([payload], "_id"));

    case SHOW_UPDATE:
      const {existingShow, updatedShow} = payload;
      const {start, end} = updatedShow;

      const nextShows = state.map(stateShow => {
        return stateShow.id === existingShow.id
          ? { ...stateShow, start, end }
          : stateShow;
      });
      return nextShows

    //Need some type of error response from server.
    case SHOW_ERROR:
      return {
        status: "ERROR",
        errorMessage: payload
      };

    default:
      return state;
  }
}
