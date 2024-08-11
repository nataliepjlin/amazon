import {addItem, cart, loadFromStorage} from "../../scripts/data/cart.js";

describe('test suite: addItem', () => {
  const id = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  
  it('add an existing product to cart', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryChoiceId: 1,
      }]);
    });
    console.log(`new: ${localStorage.getItem('cart')}`);
    loadFromStorage();

    addItem(id);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);//cart and cart length
    expect(cart[0].id).toEqual(id);
    expect(cart[0].quantity).toEqual(2);
  });
  it('add a new product to cart', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(`new: ${localStorage.getItem('cart')}`);
    loadFromStorage();

    addItem(id);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);//cart and cart length
    expect(cart[0].id).toEqual(id);
    expect(cart[0].quantity).toEqual(1);
  });
});