export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

export function findOrder(orderId){
  let matchingOrder;
  orders.forEach((order) => {
    if(order.id === orderId) matchingOrder = order;
  });
  return matchingOrder;
}
export function findProductInOrder(order, productId){
  let matchingItem;
  (order.products).forEach((item) => {
    if(item.productId === productId) matchingItem = item;
  });
  return matchingItem;
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
  
  console.log(`order added:`);
  console.log(orders);
}