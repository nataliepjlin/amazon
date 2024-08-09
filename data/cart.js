const cart = [];

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