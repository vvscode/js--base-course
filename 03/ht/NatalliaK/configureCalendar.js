(function() {

	var doc = document;

	function createForm (id){
		var form = doc.createElement('form');
		doc.body.appendChild(form);
		form.innerHTML = "<fieldset><legend>Настройки календаря</legend><label><input type='checkbox' value='changeMonth'>Разрешает выбрать месяц</label><label><input type='checkbox' value='addTask'>Разрешает добавлять задания</label><label><input type='checkbox' value='removeTask'>Разрешает удалять задания</label><label>Выберите количество месяцев<select><option>1</option><option>2</option><option>3</option></select></label><label>Выберите количество лет<select><option>1</option><option>2</option><option>3</option></select></label><input type='month' value=''></fieldset>";
	}

	createForm("createCalendar");
})();