import {formatCurrency} from "../scripts/utils/money.js";

console.log('test suite: format currency:')
console.log('cent to dollar:');
if(formatCurrency(2095) === '20.95')
    console.log('passed');
else console.log('failed');

console.log('working with 0: ');
if(formatCurrency(0) === '0.00')
  console.log('passed');
else console.log('failed');

console.log('rounding:');
if(formatCurrency(2000.5) === '20.01')
  console.log('passed');
else console.log('failed');