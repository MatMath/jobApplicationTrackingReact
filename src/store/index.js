import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';

import rootReducer from "./reducers";

const composeEnhancers = composeWithDevTools({ devToolsEnhancer }); // Wrapper over the wrapper only when in DEV mode... Maybe.

const initialState = {};
const middleware = [thunk, logger];

export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
