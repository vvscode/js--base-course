import {removeFromStorage} from "./storage";

export default function removeFavorite() {
  document.querySelector('#favorites').addEventListener('click', e => {
    let blockFav = document.querySelector('#favorites');
    if (e.target.hasAttribute('data-close')) {
      if (blockFav.querySelector('ul')) {
        let li = e.target.parentNode.parentNode;
        let ul = li.parentNode;
        let city = li.querySelector('a').innerText;
        removeFromStorage(`city - ${city}`).then( _ => {
          li.remove();

          if (!ul.childNodes.length) {
            ul.remove();
          }
        });
      }
    }
  });
}
