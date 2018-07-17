export default function writeFavoriteCityFromStorage(el) {
	let blockInfo = document.querySelector('#favorites-wrap');

	if (!blockInfo.querySelector('ul')) {
		var ul = document.createElement('ul');
		blockInfo.appendChild(ul);
		ul.classList.add('block-info__list');
	} else {
		ul = blockInfo.querySelector('ul');
	}
	ul.insertAdjacentHTML('afterbegin', el);

}
