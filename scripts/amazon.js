import {cart} from '../data/cart.js';//import {cart as myCart} ....
import {products} from '../data/products.js';
let productsHTML = '';
products.forEach((product) => {
  const {id, image, name, rating, price} = product;
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(price / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-selector-${id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-ms-${id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-btn" data-product-id="${id}">
            Add to Cart
          </button>
        </div>
  `;
});
document.querySelector('.products-grid').innerHTML = productsHTML;

let cartQuantity = 0, timeoutId;
document.querySelectorAll('.js-add-btn').forEach((btn) => {
  btn.addEventListener('click', ()=> {
    const id = btn.dataset.productId;
    const choice = Number(document.querySelector(`.js-selector-${id}`).value);
    const ms = document.querySelector(`.js-added-ms-${id}`);
  
    if(timeoutId) clearTimeout(timeoutId);
    ms.classList.add('visible');
    timeoutId = setTimeout(() => {ms.classList.remove('visible')}, 1000);

    let matchingItem;
    cart.forEach((item) => {
      if(id === item.id) matchingItem = item;
    });
    if(matchingItem) matchingItem.quantity += choice;
    else{
      cart.push({
        id,
        quantity: choice,
      });
    }
    cartQuantity += choice;
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    console.log(cart);
  });
});
