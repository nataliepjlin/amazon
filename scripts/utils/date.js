import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export function formatDate(date){
  return dayjs(date).format('MMMM DD');
}
export function isEarlier(date){
  return dayjs() < dayjs(date);
}
export function orderDateStr(date){
  const former = isEarlier(date) ? 'Arriving' : 'Delivered';
  const latter = formatDate(date);
  return former + ' on: ' + latter;
}