import {cart, cartQuantity} from '../../data/cart.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import {findProduct, findOption} from '../utils/find.js';


export function renderPaymentSummary(){
  let productSum = 0, shippingSum = 0;
  cart.forEach( (cartItem) => {
    const product = findProduct(cartItem.id);
    console.log(product);
    productSum += product.price * cartItem.quantity;

    const deliveryChoice = findOption(cartItem.deliveryChoiceId);
    const shipping = deliveryChoice.price;
    console.log(`shipping = ${shipping}`);
    shippingSum += shipping;
  });
  console.log(`${productSum}, ${shippingSum}`);
};