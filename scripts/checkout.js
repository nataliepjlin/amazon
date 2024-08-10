import {cart, removeItem, cartQuantity, updateItem, updateDelivery} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderOrderSummary(){
  let orderHTML = '';
  cart.forEach((cartItem) => {
    console.log(cartItem);
    
    let matchingProduct, deliveryChoice;

    products.forEach((product) => {
      if(product.id === cartItem.id) matchingProduct = product;
    });

    deliveryOptions.forEach((option) => {
      if(option.id === cartItem.deliveryChoiceId) deliveryChoice = option;
    });
    const today = dayjs();
    const dateStr = dateFormat(today, deliveryChoice.deliveryDays);
    orderHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-date-${matchingProduct.id}">
          Delivery date: ${dateStr}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.price)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update" data-product-id="${matchingProduct.id}">
                Update
              </span>

              <input type="number" value="${cartItem.quantity}" class="invisible quantity-input js-input js-input-${matchingProduct.id}" data-product-id=${matchingProduct.id}></input>
              <span class="link-primary invisible quantity-save js-save js-save-${matchingProduct.id}" data-product-id=${matchingProduct.id}>Save</span>

              <span class="delete-quantity-link link-primary js-del" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct.id, cartItem.deliveryChoiceId, today)}
          </div>
        </div>
      </div>
    `
  });

  function dateFormat(today, day){
    const deliveryDate = today.add(day, 'day');
    const dateStr =  deliveryDate.format('dddd, MMMM D');
    return dateStr;
  }

  function deliveryOptionsHTML(itemId, deliveryChoiceId = '1', today){
    let html = '';
    deliveryOptions.forEach((option) => {
      const dateStr = dateFormat(today, option.deliveryDays);
      const shippingStr = (option.price == 0) ? 'FREE' : `$${formatCurrency(option.price)}-`;

      const shouldCheck = (deliveryChoiceId === option.id);
      console.log(`deliveryChoiceId = ${deliveryChoiceId}, option.id = ${option.id}, shouldCheck = ${shouldCheck}`);

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${itemId}" data-option-id="${option.id}">
          <input type="radio" ${(shouldCheck) ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${itemId}">
          <div>
            <div class="delivery-option-date">
              ${dateStr}
            </div>
            <div class="delivery-option-price">
              ${shippingStr} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  };

  document.querySelector('.js-order-summary').innerHTML = orderHTML;
  document.querySelector('.js-ret').innerHTML = `${cartQuantity} items`;

  document.querySelectorAll('.js-del').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.productId;
      removeItem(id);
      console.log(cart);
    });
  });

  document.querySelectorAll('.js-update').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.productId;
      console.log(id);
      document.querySelector(`.js-cart-item-container-${id}`).classList.add('is-editing-quantity');
    });
  });
  document.querySelectorAll('.js-save').forEach((link) => {
    const id = link.dataset.productId;
    const input = document.querySelector(`.js-input-${id}`);
    
    link.addEventListener('click', () => {
      const newQuantity = Number(input.value);
      
      console.log(newQuantity);
      if(newQuantity > 0){
        updateItem(id, newQuantity);
        document.querySelector(`.js-cart-item-container-${id}`).classList.remove('is-editing-quantity');
      }
      else removeItem(id);
    });

    input.addEventListener('keydown', (event) => {
      console.log(event);
      if(event.key === 'Enter') link.click();
    })
  });
  document.querySelectorAll('.js-delivery-option').forEach((btn) => {
    const {productId, optionId} = btn.dataset;
    btn.addEventListener('click', () => {
      console.log(`${productId}, ${optionId}`);
      updateDelivery(productId, optionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary();
