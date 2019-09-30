import { combineReducers } from "redux";

import newJob from './newJob_data';
import cieList from './cieTable_data';

export default combineReducers({
  newJob,
  cieList,
});
