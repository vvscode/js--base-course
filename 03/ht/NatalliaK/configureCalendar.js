function createForm (calId){

	var doc = document,
		calId = doc.querySelector('#createCalendar'),
		form = doc.createElement('form');

		calId.appendChild(form);
		form.innerHTML = "<fieldset><legend>Настройки календаря</legend><label><input type='checkbox' value='changeMonth'>Разрешает выбрать месяцы</label><label><input type='checkbox' value='allow'>Разрешает добавлять задания</label><label><input type='checkbox' value='allowRemove'>Разрешает удалять задания</label><input type='month' ></fieldset>";
	}