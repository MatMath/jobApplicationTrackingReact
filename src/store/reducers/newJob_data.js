import moment from 'moment';
import { MODIFY_BASE_JOB_DATA, RESET_BASE_JOB_DATA } from "../actions/actionTypes";

const initialState = {
  _id: undefined,
  location: undefined,
  website: undefined,
  applicationType: undefined,
  recruiters: undefined,
  company: undefined,
  title: undefined,
  description: undefined,
  date: moment().format('YYYY-MM-DD'), // The "input" need the specific STRING format of YYYY-MM-DD not the Date object. 
  application: false,
  answer_receive: false,
  meeting: [],
  notes: undefined,
  cover_letter: undefined,
  offer: undefined,
  acceptedOffer: undefined,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MODIFY_BASE_JOB_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_BASE_JOB_DATA: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
