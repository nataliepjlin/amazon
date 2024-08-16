export let cart, cartQuantity;

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if(cart == null) cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryChoiceId: '1',
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryChoiceId: '2',
  }];

  cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
  if(cartQuantity == null) cartQuantity = 3;
};
loadFromStorage();

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
  
  console.log(`saving data to storage: (cartQuantity = ${cartQuantity})`);
  console.log(cart);
};

export function findItem(id){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(id === cartItem.productId) matchingItem = cartItem;
  });
  return matchingItem;
};
export function addItem(id, choice = 1, deliveryChoiceId = '1'){
  let matchingItem = findItem(id);

  if(matchingItem) matchingItem.quantity += choice;
  else{
    cart.push({
      productId: id,
      quantity: choice,
      deliveryChoiceId
    });
  }

  cartQuantity += choice;
  saveToStorage();
};
export function removeItem(id){
  cart = cart.filter((cartItem) => {
    if(cartItem.productId !== id) return true;
    else{
      cartQuantity -= cartItem.quantity;
      return false;
    }
  });
  saveToStorage();
  document.querySelector('.js-ret').innerHTML = `${cartQuantity} items`;

  const container = document.querySelector(`.js-cart-item-container-${id}`);
  console.log(container);
  container.remove();
};
export function updateItem(id, newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId === id){
      cartQuantity -= cartItem.quantity;
      cartItem.quantity = newQuantity;
      cartQuantity += newQuantity;
    }
  });
  saveToStorage();
  document.querySelector('.js-ret').innerHTML = `${cartQuantity} items`;
  document.querySelector(`.js-quantity-label-${id}`).innerHTML = newQuantity;
};

export function updateDelivery(productId, newDeliveryId){
  let matchingItem = findItem(productId);
  matchingItem.deliveryChoiceId = newDeliveryId;
  saveToStorage();
};

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(`response from load cart: ${text}`);
  return text;
}
// loadCartFetch();

export function loadCart(ftn){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    ftn();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export function clearCart(){
  cart.length = 0;
  cartQuantity = 0;
  saveToStorage();
}