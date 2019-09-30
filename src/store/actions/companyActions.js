import { GET_CIE_LIST, UPDATE_CIE_LIST, API_FETCHING, API_ERROR } from './actionTypes';
import { getAPIData, updateAPIData, postAPIData } from '../../apiEndpoint';


export const getCieList = () => (dispatch) => {
    console.log('Inside Action Get CIE');
    
    dispatch({ type: API_FETCHING, payload: true });

    getAPIData('cie').then((data) => {
      console.log('CIE data received:', data);
      dispatch({ type: API_FETCHING, payload: false });
      return dispatch({
        type: GET_CIE_LIST,
        success: true,
        payload: (data.sort((a,b) => a.name.localeCompare(b.name)))
      })
    })
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
  };

  export const updateCie = (data) => (dispatch) => {
    data.gps.properties.name = data.name; // TODO: fix in the BE later
    updateAPIData('cie', data)
      .then(() => dispatch({type: UPDATE_CIE_LIST, payload: data}))
      .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
  }

  export const submitNew = (data) => (dispatch) => {
    data.gps.properties.name = data.name; // TODO: fix in the BE.
    postAPIData('cie', data)
    .then((resp) => {
      // setShowNew(false);
      // setNewItem({...baseEmptyCie});
      // Easy: Re-Fetch the Data full page ????
      // optimal: Get the ID back & insert to the list? 
    })
    .catch(error => dispatch({ type: API_ERROR, payload: error.message }));
  }
