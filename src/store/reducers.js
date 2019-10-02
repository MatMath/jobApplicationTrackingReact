import { combineReducers } from "redux";

import newJob from '../newJob/redux';
import cieList from '../cie/redux';
import recruitList from '../recruiters/redux';
import utils from '../utils/redux';

export default combineReducers({
  newJob,
  cieList,
  recruitList,
  utils,
});
