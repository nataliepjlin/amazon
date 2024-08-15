import {formatCurrency} from '../utils/money.js';
class Product{
  id;
  image;
  name;
  rating;
  price;
  
  constructor(details){
    this.id = details.id;
    this.image = details.image;
    this.name = details.name;
    this.rating = details.rating;
    this.price = details.priceCents;
  };

  getStarUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.price)}`;
  }
  
  extraInfoHTML(){
    return '';
  }
};
class Clothing extends Product{
  sizeChartLink;

  constructor(details){
    super(details);
    this.sizeChartLink = details.sizeChartLink;
  }

  extraInfoHTML(){
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `;
  }
};

export function loadProductsFetch(){
  const promise = 
    fetch(
      'https://supersimplebackend.dev/products'
    ).then((res) => {
      return res.json();
    }).then((productsData) => {
      products = productsData.map((details) => {
        if(details.type === 'clothing') return new Clothing(details);
        return new Product(details);
      });
      console.log('load product fetch');
    }).catch(() => {
      console.log('Bad URL:(');
    });
  return promise;
}
// loadProductsFetch().then(() => {
//   console.log('next step');
// });

export let products = [];
export function loadProducts(ftn){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((details) => {
      if(details.type === 'clothing') return new Clothing(details);
      return new Product(details);
    });
    console.log('load product');
    ftn();
  });

  xhr.addEventListener('error', (error) => {
    console.log('ERROR, please try again later');
  });
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
loadProducts();
// console.log(products);

export function findProduct(id){
  let matchingProduct;
  products.forEach((product) => {
    if(id === product.id) matchingProduct = product;
  });
  return matchingProduct;
};

/*
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());
*/

/*
console.log(this);
const obj1 = {
  a: 2,
  b: this.a,
};
console.log(obj1);


function logThis(){
  console.log(this);
}
logThis();
logThis.call('hello');//set `this` to 'hello'

const obj2 = {
  method1: () => {
    console.log(this);
  },
  method2: function(){
    console.log(this);
  },
  method3(){
    console.log(this);
  }
}
obj2.method1();
obj2.method2();
obj2.method3();
*/