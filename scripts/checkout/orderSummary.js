import {cart, removeItem, cartQuantity, updateItem, updateDelivery} from '../data/cart.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDate, findOption} from '../data/deliveryOptions.js';
import {findProduct} from '../data/products.js'

export function renderOrderSummary(){
  let orderHTML = '';
  cart.forEach((cartItem) => {
    let matchingProduct = findProduct(cartItem.productId);
    
    let deliveryChoice = findOption(cartItem.deliveryChoiceId);
    
    const dateStr = getDate(deliveryChoice.deliveryDays);
    orderHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
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
              ${matchingProduct.getPrice()}
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

              <span class="delete-quantity-link link-primary js-del js-del-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct.id, cartItem.deliveryChoiceId)}
          </div>
        </div>
      </div>
    `
  });

  function deliveryOptionsHTML(itemId, deliveryChoiceId = '1'){
    let html = '';
    deliveryOptions.forEach((option) => {
      const dateStr = getDate(option.deliveryDays);
      const shippingStr = (option.price == 0) ? 'FREE' : `$${formatCurrency(option.price)}-`;

      const shouldCheck = (deliveryChoiceId === option.id);

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
      renderPaymentSummary();
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
        renderPaymentSummary();
      }
      else{
        const del_link = document.querySelector(`.js-del-${id}`);
        del_link.click();
      }
    });

    input.addEventListener('keydown', (event) => {
      console.log(event);
      if(event.key === 'Enter') link.click();
    })
  });
  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    const {productId, optionId} = option.dataset;
    option.addEventListener('click', () => {
      updateDelivery(productId, optionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
