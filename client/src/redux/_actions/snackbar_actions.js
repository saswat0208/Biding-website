import { SET_IS_SNACKBAR_OPEN } from './types';
const setIsSnackbarOpen = (payload) => {
  console.log(payload);
  return {
    type: SET_IS_SNACKBAR_OPEN,
    payload: payload,
  };
};
export default setIsSnackbarOpen;
