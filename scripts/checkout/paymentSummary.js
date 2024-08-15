import {cart, cartQuantity} from '../data/cart.js';
import {findProduct} from '../data/products.js';
import {findOption} from '../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import { addOrder } from '../data/orders.js';

export function renderPaymentSummary(){
  let productSum = 0, shippingSum = 0;
  cart.forEach( (cartItem) => {
    const product = findProduct(cartItem.productId);
    console.log(product);
    productSum += product.priceCents * cartItem.quantity;

    const deliveryChoice = findOption(cartItem.deliveryChoiceId);
    shippingSum += deliveryChoice.price;;
  });
  console.log(`${productSum}, ${shippingSum}`);

  const beforeTax = productSum + shippingSum;
  const tax = beforeTax * 0.1;
  const total = beforeTax + tax;

  const paymentHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productSum)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingSum)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(beforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        }),
      });
  
      const order = await response.json();//get data from response
      console.log(order);
      addOrder(order);
    }catch{
      console.log('order failed');
    }

    window.location.href = 'orders.html';
  });
};