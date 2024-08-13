class Cart{
  cartItems = undefined;
  cartQuantity = undefined; 
  
  constructor(cartKey, quantityKey){
    this.cartKey = cartKey, this.quantityKey = quantityKey;
    this.loadFromStorage();
  }
  
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.cartKey));
    if(this.cartItems == null) this.cartItems = [{
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryChoiceId: 1,
    }, {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryChoiceId: 2,
    }];
  
    this.cartQuantity = JSON.parse(localStorage.getItem(this.quantityKey));
    if(this.cartQuantity == null) this.cartQuantity = 3;
  }
  saveToStorage(){
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    localStorage.setItem(this.quantityKey, JSON.stringify(this.cartQuantity));
  }
  findItem(id){
    let matchingItem = undefined;
    (this.cartItems).forEach((cartItem) => {
      if(id === cartItem.id) matchingItem = cartItem;
    });
    return matchingItem;
  }
  addItem(id, choice = 1, deliveryChoiceId = 1){
    let matchingItem = this.findItem(id);
  
    if(matchingItem) matchingItem.quantity += choice;
    else{
      (this.cartItems).push({
        id,
        quantity: choice,
        deliveryChoiceId
      });
    }
  
    this.cartQuantity += choice;
    this.saveToStorage();
  }
  removeItem(id){
    this.cartItems = (this.cartItems).filter((cartItem) => {
      if(cartItem.id !== id) return true;
      else{
        this.cartQuantity -= cartItem.quantity;
        return false;
      }
    });
    this.saveToStorage();
    document.querySelector('.js-ret').innerHTML = `${this.cartQuantity} items`;
  
    const container = document.querySelector(`.js-cart-item-container-${id}`);
    console.log(container);
    container.remove();
  }
  updateItem(id, newQuantity){
    (this.cartItems).forEach((cartItem) => {
      if(cartItem.id === id){
        this.cartQuantity -= cartItem.quantity;
        cartItem.quantity = newQuantity;
        this.cartQuantity += newQuantity;
      }
    });
    this.saveToStorage();
    document.querySelector('.js-ret').innerHTML = `${this.cartQuantity} items`;
    document.querySelector(`.js-quantity-label-${id}`).innerHTML = newQuantity;
  }
  updateDelivery(productId, newDeliveryId){
    let matchingItem = this.findItem(productId);
    matchingItem.deliveryChoiceId = newDeliveryId;
    this.saveToStorage();
  }
};

const cart1 = new Cart('cart1', 'q1');
const cart2 = new Cart('cart2', 'q2');


cart1.addItem('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart1);

console.log(cart2);
console.log(cart2 instanceof Cart);