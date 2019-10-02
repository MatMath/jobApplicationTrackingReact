import { combineReducers } from "redux";

import newJob from './newJob_data';
import cieList from '../../cie/redux';
import recruitList from '../../recruiters/redux';
import utils from './utils';

export default combineReducers({
  newJob,
  cieList,
  recruitList,
  utils,
});
