import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';

import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk, devToolsEnhancer()];

export default createStore(rootReducer, initialState, devToolsEnhancer());
// export default createStore(rootReducer, initialState, applyMiddleware(...middleware));
