import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../scripts/data/cart.js'
import { loadProducts, loadProductsFetch } from '../../scripts/data/products.js';

const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const id2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: renderOrderSummary', () => {
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-ret"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: id1,
        quantity: 2,
        deliveryChoiceId: 1,
      }, {
        productId: id2,
        quantity: 1,
        deliveryChoiceId: 2,
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });
  
  it('display cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(
      document.querySelector(`.js-quantity-label-${id1}`).innerText
    ).toEqual('2');

    expect(
      document.querySelector(`.js-quantity-label-${id2}`).innerText
    ).toEqual('1');

  });

  it('removes a product', () => {
    document.querySelector(`.js-del-${id1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${id1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${id2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(id2);
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
});