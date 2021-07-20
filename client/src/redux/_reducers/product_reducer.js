import { FETCH_PRODUCTS } from '../_actions/types';

export default function product(state = {}, actions) {
  switch (actions.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: actions.payload };
    default:
      return { ...state };
  }
};
