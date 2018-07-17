export default function askNameCity(htmlEl) {
	console.log(htmlEl);
	var modal = document.createElement('div');

	modal.id = 'modal';
	modal.classList = 'modal';
	modal.innerHTML =
		'<label><p class="modal__text">Напишите название населенного пункта:</p><input id="modal-input" class="modal__input" type="text" autofocus></label><div class="modal__btn-wrap"><button id="addName" class="modal__btn btn">Готово</button><button id="cancelName" class="modal__btn btn">Отмена</button></div>';
	htmlEl.appendChild(modal);
}