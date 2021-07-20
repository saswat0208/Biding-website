import { FETCH_IS_DRAWER_OPEN, SET_IS_DRAWER_OPEN } from './types';

const localStorageIsDrawerOpenKey = 'isDrawerOpen';

// Set the open/close state of the drawer
export const setIsDrawerOpen = async (isDrawerOpen) => {
  localStorage.setItem(localStorageIsDrawerOpenKey, isDrawerOpen);
  return {
    type: SET_IS_DRAWER_OPEN,
    payload: isDrawerOpen,
  };
};

export const fetchIsDrawerOpen = async () => {
  return {
    type: FETCH_IS_DRAWER_OPEN,
    payload: Boolean(localStorage.getItem(localStorageIsDrawerOpenKey) === 'true'),
  };
};
