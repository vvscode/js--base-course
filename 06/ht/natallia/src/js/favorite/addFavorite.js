import setStorage from './setLocalStorage.js';
import getStorage from './getLocalStorage.js';

export default function addFavorite() {
  document.querySelector('#star').addEventListener('click', function(e) {
    if (window.location.hash.search(/city/) === -1) {
      return;
    }

    let city = decodeURI(window.location.hash.replace(/#city\//, ''));
    let blockInfo = document.querySelector('#favorites-wrap');

    e.preventDefault();
    var value = false;
    if (!blockInfo.querySelector('ul')) {
      var ul = document.createElement('ul');
      blockInfo.appendChild(ul);
    } else {
      ul = blockInfo.querySelector('ul');
      ul.classList.add('block-info__list');
      let favCities = blockInfo.querySelectorAll('a');
      favCities.forEach(el => {
        if (el.innerText === `${city}`) {
          value = true;
        }
      });
    }

    if (!value) {
      let keyName = city;
      let valueFavorite = `<li class="block-info__item"><a href="#city/${city}">${city}</a><button data-close="${city}" class="close btn"><img data-close="${city}" src="img/close.svg"></button></li>`;
      setStorage(keyName, valueFavorite).then(_ => {
        getStorage(keyName).then(data => {
          ul.insertAdjacentHTML('afterbegin', data);
        });
      });
    }
  });
}
