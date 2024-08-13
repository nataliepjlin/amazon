import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
const today = dayjs();
// console.log(today);

function isWeekend(date){
  const day = date.format('ddd');
  return day === 'Sat' || day === 'Sun';
}
export function getDate(optionDay){
  let need = 0, actualDate = today;
  while(optionDay > 0){
    if(!isWeekend(actualDate)) optionDay--;
    actualDate = actualDate.add(1, 'days');
    need++;
  }
  const dateStr =  actualDate.format('dddd, MMMM D');
  return dateStr;
}

export const deliveryOptions = [{
  id: 1,
  deliveryDays: 7,
  price: 0
}, {
  id: 2,
  deliveryDays: 3,
  price: 499
}, {
  id: 3,
  deliveryDays: 1,
  price: 999
}];
export function findOption(id = 1){
  return deliveryOptions[id - 1];
}