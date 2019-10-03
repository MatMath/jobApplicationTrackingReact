import {
  RECRUIT_GET_LIST,
  RECRUIT_UPDATE_LIST,
  RECRUIT_REMOVE_LIST_ID,
  RECRUIT_RESET_NEW_ITEM,
  RECRUIT_SHOW_NEW_ITEM,
  RECRUIT_SET_ACTIVE_ID,
} from './actionsType';

const baseEmptyRecruiters = {
  _id:undefined,
  cie:'',
  name:'',
  email:'',
};


const initialState = {
  list: [],
  newItem: {...baseEmptyRecruiters},
  showNew: false,
  activeId: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECRUIT_GET_LIST:
      if (action.success === true) {
        return {...state, list: action.payload};
      }
      return state;
    case RECRUIT_UPDATE_LIST:
      const list = state.list.map(item => {
        if (item._id === action.payload._id) return action.payload
        return item;
      });
      return {...state, list, activeId: ''};
    case RECRUIT_REMOVE_LIST_ID:
      return {...state, list: state.list.filter(item => item._id !== action.payload)};
    case RECRUIT_RESET_NEW_ITEM:
      return {...state, newItem: {...baseEmptyRecruiters}};
    case RECRUIT_SHOW_NEW_ITEM:
      // If we show a new one it should be reseted, if we close we should reset it too.
      return {...state, showNew: action.payload, newItem: {...baseEmptyRecruiters} };
    case RECRUIT_SET_ACTIVE_ID:
      return {...state, activeId: action.payload};
    default:
        return state;
  }
}