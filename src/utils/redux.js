import { API_FETCHING, API_ERROR } from './actionTypes';

const initial = {
  fetching: false,
  error: false,
}

export default function(state = { ...initial }, action) {
  switch (action.type) {
    case API_FETCHING:
      return {...state, fetching: action.payload, error: false};
    case API_ERROR:
      return {...state, fetching: false, error: action.payload};
    default:
      return state;
  }
};