import getStorage from './getLocalStorage.js';

export default function getAllStorage() {
  let wrap = document.querySelector('#favorites-wrap');
  if (!wrap.querySelector('ul')) {
    var ul = document.createElement('ul');
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      getStorage(key).then(data => {
        ul.innerHTML += data;
      });
    }
    wrap.appendChild(ul);
  }
}
