import {
  RECRUIT_GET_LIST,
  RECRUIT_UPDATE_LIST,
  RECRUIT_SHOW_NEW_ITEM,
  RECRUIT_REMOVE_LIST_ID,
  RECRUIT_SET_ACTIVE_ID,
} from './actionsType';
import { API_FETCHING, API_ERROR } from '../store/actions/actionTypes';

import { getAPIData, updateAPIData, postAPIData } from '../apiEndpoint';


export const getList = () => (dispatch) => {
    dispatch({ type: API_FETCHING, payload: true });
    getAPIData('recruiters').then((data) => {
      dispatch({ type: API_FETCHING, payload: false });
      return dispatch({
        type: RECRUIT_GET_LIST,
        success: true,
        payload: (data.sort((a,b) => a.name.localeCompare(b.name)))
      })
    })
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
};

export const updateExisting = (data) => (dispatch) => {
  updateAPIData('recruiters', data)
    .then(() => dispatch({type: RECRUIT_UPDATE_LIST, payload: data}))
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
}

export const submitNew = (data) => (dispatch) => {
  postAPIData('recruiters', data)
  .then((resp) => dispatch({type: RECRUIT_SHOW_NEW_ITEM, payload: false}))
  .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
}

export const removeIdFromList = (payload) => ({ type: RECRUIT_REMOVE_LIST_ID, payload });
export const setShowNew = (payload) => ({ type: RECRUIT_SHOW_NEW_ITEM, payload});
export const setActiveId = (payload) => ({ type: RECRUIT_SET_ACTIVE_ID, payload});

