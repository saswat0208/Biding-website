
import { SET_IS_SNACKBAR_OPEN } from '../_actions/types';
export default function(state = { isOpen: false, message: '', severity: 'info' }, action) {
  switch (action.type) {
    case SET_IS_SNACKBAR_OPEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
