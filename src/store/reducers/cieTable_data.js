import { GET_CIE_LIST, UPDATE_CIE_LIST } from '../actions/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CIE_LIST:
      if (action.success === true) {
        return action.payload;
      }
      return state;
    case UPDATE_CIE_LIST:
      return state.map(item => {
        if (item._id === action.payload._id) return action.payload
        return item;
      });
    default:
        return state;
  }

}