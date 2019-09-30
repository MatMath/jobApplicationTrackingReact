import { combineReducers } from "redux";

import newJob from './newJob_data';
import cieList from './cieTable_data';
import utils from './utils';

export default combineReducers({
  newJob,
  cieList,
  utils,
});
