import { CIE_LIST } from '../actions/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  console.log('Payload:', action);
  switch (action.type) {
    case CIE_LIST:
      if (action.success === true) {
        return action.payload;
      }
      return state;
      // API call???? Dispatch??? here or in the other page?
      default:
          return state;
  }

}