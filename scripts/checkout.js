import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from './data/products.js';
import { loadCart } from './data/cart.js';
//import './data/cart-class.js';
// import './data/backend-practice.js'

async function loadPage() {
    
    await loadProductsFetch();
    
    const val = await new Promise((resolve) => {
      loadCart(() => {
        resolve('wooooof');
      });
    });
    console.log(val);

    renderOrderSummary();
    renderPaymentSummary();

    // return 'woof';//resolve
}
loadPage();