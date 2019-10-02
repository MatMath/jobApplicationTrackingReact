import {
  CIE_GET_LIST,
  CIE_UPDATE_LIST,
  CIE_SHOW_NEW_ITEM,
  CIE_REMOVE_LIST_ID,
  CIE_SET_ACTIVE_ID,
} from './actionsType';
import { API_FETCHING, API_ERROR } from '../store/actions/actionTypes';

import { getAPIData, updateAPIData, postAPIData } from '../apiEndpoint';


export const getCieList = () => (dispatch) => {
    dispatch({ type: API_FETCHING, payload: true });
    getAPIData('cie').then((data) => {
      dispatch({ type: API_FETCHING, payload: false });
      return dispatch({
        type: CIE_GET_LIST,
        success: true,
        payload: (data.sort((a,b) => a.name.localeCompare(b.name)))
      })
    })
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
};

export const updateCie = (data) => (dispatch) => {
  data.gps.properties.name = data.name; // TODO: fix in the BE later
  updateAPIData('cie', data)
    .then(() => dispatch({type: CIE_UPDATE_LIST, payload: data}))
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
}

export const submitNew = (data) => (dispatch) => {
  data.gps.properties.name = data.name; // TODO: fix in the BE.
  postAPIData('cie', data)
  .then((resp) => dispatch({type: CIE_SHOW_NEW_ITEM, payload: false}))
  .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
}

export const removeIdFromList = (payload) => ({ type: CIE_REMOVE_LIST_ID, payload });
export const setShowNew = (payload) => ({ type: CIE_SHOW_NEW_ITEM, payload});
export const setActiveId = (payload) => ({ type: CIE_SET_ACTIVE_ID, payload});

