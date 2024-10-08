import {formatCurrency} from '../utils/money.js';
class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  
  constructor(details){
    this.id = details.id;
    this.image = details.image;
    this.name = details.name;
    this.rating = details.rating;
    this.priceCents = details.priceCents;
  };

  getStarUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
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
class Appliance extends Product{
  instructionsLink;
  warrantyLink;
  constructor(details){
    super(details);
    this.instructionsLink = 'https://supersimple.dev/images/appliance-instructions.png';
    this.warrantyLink = 'https://supersimple.dev/images/appliance-warranty.png';
  }
  extraInfoHTML(){
    return `
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `;
  }
};

export async function loadProductsFetch(){
  try{
    const response = await fetch('https://supersimplebackend.dev/products');
    const productsData = await response.json();
    products = productsData.map((details) => {
      if(details.type === 'clothing') return new Clothing(details);
      else if((details.keywords).includes('appliances')){
        console.log(details.name);
        return new Appliance(details);
      }
      return new Product(details);
    });
    return productsData;

  }catch(error){
    console.log(error);
  }
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