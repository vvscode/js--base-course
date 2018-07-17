import changeUrl from '../utils/changeUrl';

export default function searchCity() {
  document.querySelector('.search__img').addEventListener('click', setUrl);
  document.addEventListener('keypress', setUrl);
}

function setUrl(e) {
  if (e.which === 1 || e.charCode === 13) {
    let value = document.querySelector('.search__input').value;
    let url = `city/${value}`;
    changeUrl(url);
    document.querySelector('.search__input').value = '';
  }
}
