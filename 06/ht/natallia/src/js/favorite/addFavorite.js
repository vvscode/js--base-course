import {setStorage} from './storage';
import {getStorage} from './storage';
import askNameCity from './askNameCity';
import writeFavoriteCityFromStorage from './writeFavoriteCityFromStorage';
import {router} from '../index';

export default function addFavorite(e) {
	if (router.url.match(/city/)) {
		var city = router.url.replace(/city\//, '');
		var addr = router.url;
		addCityByStorage(city, addr);
	} else if (router.url.match(/center/)) {
		let parEl = e.target.parentNode.parentNode;
		askNameCity(parEl);

		parEl.querySelector('#cancelName').addEventListener('click', _ => {
			parEl.querySelector('#modal').remove();
			return;
		});

		parEl.querySelector('#addName').addEventListener('click', e => {
			e.preventDefault();
			city = parEl.querySelector('#modal-input').value;
			parEl.querySelector('#modal').remove();
			addr = router.url;
			addCityByStorage(city, addr);
		});
	}
}

function addCityByStorage(city, addr) {
	getStorage(`city - ${city}`)
		.then(val => {
		if (!val) {
			let favCityEl = `<li class="block-info__item"><a href="#${addr}">${city}</a><button data-close="${city}" class="close btn"><img data-close="${city}" src="img/close.svg"></button></li>`;
			return favCityEl;
		}
	})
		.then(el => {
			setStorage(`city - ${city}`, el)
				.then( _ => {
					getStorage(`city - ${city}`)
						.then(el => {
							writeFavoriteCityFromStorage(el);
						})
				});
		});
}
