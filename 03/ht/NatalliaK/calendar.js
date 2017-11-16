var data = new Date();
var month = new Date().getMonth();
var year = new Date().getFullYear();
var before;
var after;
var doc = document;
var writeEvent = doc.createElement('div');
var close;
var tdAll = doc.querySelectorAll('td');
var calendar = document.getElementById("calendar");
var createCalendar = doc.getElementById('createCalendar');
var selectedTd;
var tdDay = '';
var tdMonth = '';
form = doc.createElement("form");
var value = {};
function drawCalendar(year, month, id) {

	var date = new Date(year, month);

	var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	for (var i = 0; i < getDay(date); i++) {
		table += '<td></td>';
	}

	while (date.getMonth() === month) {

		var eventDate = date.getDate();
		var tasks = localStorage[`event_for_` + eventDate + '/' + month] || '';
		table += '<td data-date="' + eventDate + '" data-month="' + month + '">' + date.getDate() + tasks + '</td>';

		if (getDay(date) % 7 === 6) {
			table += '</tr><tr>';
		}

		date.setDate(date.getDate() + 1);
		}

	if (getDay(date) !== 0) {
		for (i = getDay(date); i < 7; i++) {
			table += '<td></td>';
		}
	}

	table += '</tr></table>';

	document.getElementById('calendar').innerHTML = table;
	return date;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
	var day = date.getDay();
	if (day === 0) day = 7;
	return day - 1;
}

function writeMonthAndYear(year, month) {
	var date = new Date(year || data.getFullYear(), month || data.getMonth());
	var writeMonth = date.toLocaleString('ru', {month: 'long'});
	var year = date.toLocaleString('ru', {year: 'numeric'});

	var calend = document.querySelector('table');
	var p = document.querySelector("p");
	if (!p) {
		p = document.createElement("p");
		calend.parentNode.insertBefore(p, calend);
	}
	p.innerHTML = writeMonth + " " + year;
	return writeMonth + " " + year;
}

function getPrev() {
	var inputPrev = document.createElement("input");
	inputPrev.className = "before";
	inputPrev.type = "button";
	inputPrev.value = " < ";
	var p = document.querySelector("p");

	p.insertBefore(inputPrev, p.firstChild);
	inputPrev.style.cursor = "pointer";
	inputPrev.addEventListener("click", function() {
		--month;
		if (month < 0) {
			month = 11;
			year -= 1;
		}
		drawInteractiveCalendar("calendar", year, month);
	});
	return inputPrev;
}

function getNext() {
	var inputNext = document.createElement("input");
	inputNext.className = "after";
	inputNext.type = "button";
	inputNext.value = " > ";
	var p = document.querySelector("p");

	p.appendChild(inputNext);
	inputNext.style.cursor = "pointer";
	inputNext.addEventListener("click", function() {
		++month;
		if (month > 11) {
			month = 0;
			year += 1;
		}
		drawInteractiveCalendar("calendar", year, month);
	});
	return inputNext;
}

function drawInteractiveCalendar(id, year, month, changeMonth, allow, allowRemove) {

	year = year || data.getFullYear();
	month = month || data.getMonth();
	drawCalendar(year, month, id);
	writeMonthAndYear(year, month);

	if (!(changeMonth)) {
		getPrev();
		getNext();
	}

	if (!(allow)) {
		calendar.ondblclick = function(event) {

			var target = event.target;

			if (!event.target.matches('td')) {
				return;
			}

			if (target.tagName === "TD" && target.innerHTML !== '') {

				selectTd(target);

				var userEvent = prompt("Что делать будешь?", "Решать Васину задачку!");

				if (userEvent === '' || userEvent === null) {
					userEvent = 'Секретная миссия';
				}

				var userCont = doc.createElement('div');
				userCont.className = 'userCont';

				var userWr = doc.createElement('div');
				userWr.className = 'userSelect';

				userWr.innerHTML = userEvent;

				target.appendChild(userCont);
				userCont.appendChild(userWr);

				if (!(allowRemove)) {
					close = doc.createElement('button');
					close.innerHTML = 'x';
					userWr.appendChild(close);

					close.onclick = function() {
						var askUser = confirm('Может все-таки задачку? Точно будешь отжиматься?');
						if (askUser) {
							var el = this.parentNode;
							el.parentNode.removeChild(el);
						}
					};
				}

				tdDay = target.getAttribute('data-date');
				tdMonth = target.getAttribute('data-month');
				var keyName = `event_for_` + tdDay + '/' + tdMonth || '';
				writeEvent = localStorage.getItem(keyName);

				if (localStorage[keyName] !== undefined) {
					localStorage[keyName] += userCont.innerHTML + '<br>';
				}

				if (localStorage[keyName] === undefined) {
					localStorage[keyName] = userCont.innerHTML + '<br>';
				}
			}
		};
	}
}

function selectTd(node) {
	if (selectedTd) {
		selectedTd.classList.remove('selected');
	}
	selectedTd = node;
	selectedTd.classList.add('selected');
}

form.onclick = function(event) {

	var target = event.target;

	if (target.tagName === "INPUT") {

		value.div =  (function() {
			let id = 'calendar' + Math.random();
			return "#" + id.replace('.', '');
		})();

		value.changeMonth = form.querySelector("input[value=changeMonth]").checked;

		value.allow = form.querySelector("input[value=allow]").checked;

		value.allowRemove = form.querySelector("input[value=allowRemove]").checked;

		value.date = document.querySelector('input[type="month"]').value;
	}

	console.log("On form click: ", value);
	console.log('drawInteractiveCalendar(' + value.div + ');');
	document.querySelector('.output').innerHTML = '<div id ="' + value.div.replace('#', '') + '"></div>';

	function prevDrawInteractiveCalendar(value) {
		localStorage.clear();

		var id = value.div;
		var month = new Date(value.date).getMonth();
		var year = new Date(value.date).getFullYear();
		var changeMonth = value.changeMonth;
		var allow = value.allow;
		var allowRemove = value.allowRemove;
		var date = value.date || null;

		year = year || data.getFullYear();
		month = month || data.getMonth();
		drawCalendar(year, month, id);
		writeMonthAndYear(year, month);

		if (!(changeMonth === false)) {
			getPrev();
			getNext();
		}

		if (!(allow === false)) {
			calendar.ondblclick = function(event) {

				var target = event.target;

				if (!event.target.matches('td')) {
					return;
				}

				if (target.tagName === "TD" && target.innerHTML !== '') {

					selectTd(target);

					var userEvent = prompt("Что делать будешь?", "Решать Васину задачку!");

					if (userEvent === '' || userEvent === null) {
						userEvent = 'Секретная миссия';
					}

					var userWr = doc.createElement('div');

					userWr.className = 'userSelect';

					userWr.innerHTML = userEvent;

					target.appendChild(userWr);

					if (!(allowRemove)) {
						close = doc.createElement('button');
						close.innerHTML = 'x';
						userWr.appendChild(close);

						close.onclick = function () {
							var askUser = confirm('Может все-таки задачку? Точно будешь отжиматься?');
							if (askUser) {
								var el = this.parentNode;
								el.parentNode.removeChild(el);
							}
						};
					}
				}
			};
		}
	}

	prevDrawInteractiveCalendar(value);

	document.querySelector('.output').innerHTML = 'drawInteractiveCalendar({<br> div: ' + value.div + ',<br>showMonth: ' + value.changeMonth + ',<br>allow: ' + value.allow + ',<br>allowRemove: ' + value.allowRemove + ',<br>date: ' + (value.date || null) + '<br>});';
};

function createForm() {
	createCalendar.appendChild(form);
	form.innerHTML =
		"<fieldset><legend>Настройки календаря</legend><label><input type='checkbox' value='changeMonth'>Разрешает выбрать месяцы</label><label><input type='checkbox' value='allow'>Разрешает добавлять задания</label><label><input type='checkbox' value='allowRemove'>Разрешает удалять задания</label><input type='month' ></fieldset><div class='output'></div>";
}

createForm();