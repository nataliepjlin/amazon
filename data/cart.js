export const cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

export function addItem(id){
  let matchingItem, cartQuantity = 0;
  const choice = Number(document.querySelector(`.js-selector-${id}`).value);
  
  cart.forEach((cartItem) => {
    if(id === cartItem.id) matchingItem = cartItem;
    cartQuantity += cartItem.quantity;
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
}