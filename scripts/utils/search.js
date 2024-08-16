export function searchSetUp(){
  const btn = document.querySelector('.js-search-btn');
  const input = document.querySelector('.js-search-bar');

  btn.addEventListener('click', () => {
    console.log(input.value);
    window.location.href = `index.html?search=${input.value}`;
    input.value = '';
  });
  input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') btn.click();
  })
}