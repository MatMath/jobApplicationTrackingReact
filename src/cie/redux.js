import {
  CIE_GET_LIST,
  CIE_UPDATE_LIST,
  CIE_REMOVE_LIST_ID,
  CIE_RESET_NEW_ITEM,
  CIE_SHOW_NEW_ITEM,
  CIE_SET_ACTIVE_ID,
} from './actionsType';

const baseEmptyCie = {
  name :"",
  location :"",
  gps: {
      "type":"Feature",
      "geometry":{
        "type":"Point",
        "coordinates":[0, 0]},
        "properties":{"name":""}
    }
}

const initialState = {
  list: [],
  newItem: {...baseEmptyCie},
  showNew: false,
  activeId: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CIE_GET_LIST:
      if (action.success === true) {
        return {...state, list: action.payload};
      }
      return state;
    case CIE_UPDATE_LIST:
      const list = state.list.map(item => {
        if (item._id === action.payload._id) return action.payload
        return item;
      });
      return {...state, list, activeId: ''};
    case CIE_REMOVE_LIST_ID:
      return {...state, list: state.list.filter(item => item._id !== action.payload)};
    case CIE_RESET_NEW_ITEM:
      return {...state, newItem: {...baseEmptyCie}};
    case CIE_SHOW_NEW_ITEM:
      // If we show a new one it should be reseted, if we close we should reset it too.
      return {...state, showNew: action.payload, newItem: {...baseEmptyCie} };
    case CIE_SET_ACTIVE_ID:
      return {...state, activeId: action.payload};
    default:
        return state;
  }
}