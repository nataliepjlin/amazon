export let cart = JSON.parse(localStorage.getItem('cart'));
if(cart == null) cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];
export let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
if(cartQuantity == null) cartQuantity = 3;

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
}

export function addItem(id, choice){
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(id === cartItem.id) matchingItem = cartItem;
  });

  if(matchingItem) matchingItem.quantity += choice;
  else{
    cart.push({
      id,
      quantity: choice,
    });
  }

  cartQuantity += choice;
  saveToStorage();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  console.log(cart);
}
export function removeItem(id){
  cart = cart.filter((cartItem) => {
    if(cartItem.id !== id) return true;
    else{
      cartQuantity -= cartItem.quantity;
      return false;
    }
  });
  saveToStorage();
  document.querySelector('.js-ret').innerHTML = `${cartQuantity} items`;
}
export function updateItem(id, newQuantity){
  if(newQuantity == 0) removeItem(id);
  else{
    cart.forEach((cartItem) => {
      if(cartItem.id === id){
        cartQuantity -= cartItem.quantity;
        cartItem.quantity = newQuantity;
        cartQuantity += newQuantity;
      }
    });
    saveToStorage();
  }
}