import { combineReducers } from "redux";

import newJob from './newJob_data';
import cieList from '../../cie/redux';
import utils from './utils';

export default combineReducers({
  newJob,
  cieList,
  utils,
});
