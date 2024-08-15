import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from './data/products.js';
import { loadCart } from './data/cart.js';
//import './data/cart-class.js';
// import './data/backend-practice.js'

async function loadPage() {
    try{
      // throw 'meow';
      await loadProductsFetch();
    
      const val = await new Promise((resolve, reject) => {
        // throw 'meow';
        loadCart(() => {
          // reject('meow');
          resolve('wooooof');
        });
      });
      console.log(val);
    } catch(error){
      console.log('bad await');
    }

    renderOrderSummary();
    renderPaymentSummary();

    // return 'woof';//resolve
}
loadPage();