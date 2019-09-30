import { FETCHING, SET_ERROR, CIE_LIST } from './actionTypes';
import { getAPIData } from '../../apiEndpoint';


export const getCieList = () => (dispatch) => {
    console.log('Inside Action Get CIE');
    
    dispatch({ type: FETCHING, payload: true });
    dispatch({ type: SET_ERROR, payload: false });

    getAPIData('cie').then((data) => {
      console.log('CIE data received:', data);
      return dispatch({
        type: CIE_LIST,
        success: true,
        payload: (data.sort((a,b) => a.name.localeCompare(b.name)))
      })
    })
    .catch(error => dispatch({
      type: CIE_LIST,
      success: false,
      error: error.message,
      payload: null,
    }))
  };