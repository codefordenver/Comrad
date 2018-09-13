import { AUTH_SIGNIN, AUTH_SIGNOUT, AUTH_FETCH, AUTH_ERROR } from '../actions/types';

const initialState = {
  status: 'fetching',
  errorMessage: ''
}

export default function(state = initialState, action) {
  switch(action.type) {

    case AUTH_SIGNIN:
      return { ...state, ...action.payload }

    case AUTH_SIGNOUT:
      return {...action.payload}

    case AUTH_FETCH:
      return {...state, ...action.payload }

    case AUTH_ERROR:
      return {...action.payload}

    default:
      return state;
  }
}