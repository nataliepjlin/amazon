import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from './data/products.js';
import { loadCartFetch } from './data/cart.js';
//import './data/cart-class.js';
// import './data/backend-practice.js'

async function loadPage() {
    try{
      // throw 'meow';
      await Promise.all([loadProductsFetch(), loadCartFetch()]);
    } catch(error){
      console.log('bad await');
    }

    renderOrderSummary();
    renderPaymentSummary();
    // return 'woof';//resolve
}
loadPage();