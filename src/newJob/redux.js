import moment from 'moment';
import { MODIFY_BASE_JOB_DATA, RESET_BASE_JOB_DATA } from "./actionTypes";

const initialState = {
  _id: undefined,
  location: '',
  website: '',
  applicationType: '',
  recruiters: '',
  company: '',
  title: '',
  description: '',
  date: moment().format('YYYY-MM-DD'), // The "input" need the specific STRING format of YYYY-MM-DD not the Date object. 
  application: false,
  answer_receive: false,
  meeting: [],
  notes: '',
  cover_letter: '',
  offer: '',
  acceptedOffer: false,
};

export default function(state = {...initialState}, action) {
  switch (action.type) {
    case MODIFY_BASE_JOB_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_BASE_JOB_DATA: {
      console.log('I reset all Data', initialState);
      
      return { ...initialState };
    }
    default:
      return state;
  }
}
