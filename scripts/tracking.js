import { findOrder, findProductInOrder} from "./data/orders.js";
import { formatDate } from "./utils/date.js";
import { findProduct, loadProductsFetch} from "./data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function progressPercentage(orderTime, deliveryTime){
  const today = dayjs(), odt = dayjs(orderTime), dt = dayjs(deliveryTime);
  return (today.diff(odt) / dt.diff(odt)) * 100;
}
function renderTracking(){
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = findOrder(orderId);
  const item = findProductInOrder(order, productId);
  const product = findProduct(productId);
  
  const barWidth = progressPercentage(order.orderTime, item.estimatedDeliveryTime);
  console.log(barWidth);

  let html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatDate(item.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${item.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-progress-preparing">
        Preparing
      </div>
      <div class="progress-label js-progress-shipped">
        Shipped
      </div>
      <div class="progress-label js-progress-delivered">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = html;
  document.querySelector('.js-progress-bar').style['width'] = `${barWidth}%`;
  
  if(barWidth < 50) document.querySelector('.js-progress-preparing').classList.add('current-status');
  else if(barWidth < 100) document.querySelector('.js-progress-shipped').classList.add('current-status');
  else document.querySelector('.js-progress-delivered').classList.add('current-status');
}

async function loadPage() {
  await loadProductsFetch();
  renderTracking();
}
loadPage();
