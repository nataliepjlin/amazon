import {cartQuantity, addItem} from './data/cart.js';
import {orders} from './data/orders.js';
import {formatCurrency} from './utils/money.js'
import {formatDate} from './utils/date.js'
import {findProduct, loadProductsFetch} from './data/products.js';

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

function renderPastOrder(){
  let ordersHTML = '';
  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
  
        <div class="order-details-grid">
          ${orderDetailsHTML(order.products)}
        </div>
      </div>
    `
  });
  function orderDetailsHTML(purchases){
    let html = '';
    purchases.forEach((item) => {
      let matchingProduct = findProduct(item.productId);
      console.log(matchingProduct);
      html += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
  
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(item.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${item.productId}" data-product-quantity="${item.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
  
        <div class="product-actions">
          <a href="tracking.html?orderId=123&productId=456">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    });
    return html;
  }
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  document.querySelectorAll('.js-buy-again').forEach((btn) => {
    btn.addEventListener('click', () => {
      const {productId, productQuantity} = btn.dataset;
      console.log(`${productId}, ${productQuantity}`);
      addItem(productId, Number(productQuantity));
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  })
}

async function loadPage(){
  try{
    await loadProductsFetch();
  }catch(error){
    console.log(error);
  }
  renderPastOrder();
}
loadPage();



