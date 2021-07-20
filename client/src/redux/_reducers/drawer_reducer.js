import {
  SET_IS_DRAWER_OPEN,
  FETCH_IS_DRAWER_OPEN,
} from '../_actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_IS_DRAWER_OPEN:
      return { ...state, isOpen: action.payload };
    case FETCH_IS_DRAWER_OPEN:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}
