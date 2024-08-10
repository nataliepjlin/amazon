import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
export function findItem(id){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(id === cartItem.id) matchingItem = cartItem;
  });
  return matchingItem;
}
export function findProduct(id){
  let matchingProduct;
  products.forEach((product) => {
    if(id === product.id) matchingProduct = product;
  });
  return matchingProduct;
};
export function findOption(id = 1){
  return deliveryOptions[id - 1];
}