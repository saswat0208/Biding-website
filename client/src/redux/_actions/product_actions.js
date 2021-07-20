import { Categories } from '../../Categories';
import axios from 'axios';
import { FETCH_PRODUCTS } from './types';
export const fetchProducts = () => {
  const productArray = [];

  axios.get('http://localhost:8080/getproduct')
      .then((results) => {
        Categories.map((i) => {
          const temp = [];
          results.data.map((j) => {
            if (j.category === i._id) {
              temp.push(j);
            }
          });
          if (temp.length > 0) {
            productArray.push({
              type: i.name,
              arr: temp,
            });
          }
        });
        console.log('productarray', productArray);
      });

  return {
    type: FETCH_PRODUCTS,
    payload: productArray,
  };
};
