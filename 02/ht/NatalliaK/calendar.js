var data = new Date();
var month = new Date().getMonth();
var year = new Date().getFullYear();
var before;
var after;

function drawCalendar(year, month, id) {


	var date = new Date(year, month);

	var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	for (var i = 0; i < getDay(date); i++) {
		table += '<td></td>';
	}

	while (date.getMonth() === month) {
		table += '<td>' + date.getDate() + '</td>';

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

function writeMonthAndYear() {
	var date = new Date();
	var month = date.toLocaleString('ru', {month: 'long'});
	var year = date.toLocaleString('ru', {year: 'numeric'});

	var p = document.createElement('p');
	p.innerHTML = month + " " + year;
	document.body.insertBefore(p, document.body.firstChild);
	return month + " " + year;
}

	function getPrev() {
		var inputPrev = document.createElement('input');
		inputPrev.className = "before";
		inputPrev.type = "button";
		inputPrev.value = " < ";
		p.insertBefore(inputPrev, p.firstChild);
		inputPrev.style.cursor = "pointer";
		document.querySelector('input.before').addEventListener('click', function () {
			--month;
			if (month < 0) {
				month = 11;
				year -= 1;
			}
			drawInteractiveCalendar('calendar');
		});
		return inputPrev;
	}


	function getNext() {
		var inputNext = document.createElement('input');
		inputNext.className = "after";
		inputNext.type = "button";
		inputNext.value = " > ";
		p.appendChild(inputNext);
		inputNext.style.cursor = "pointer";
		document.querySelector('input.before').addEventListener('click', function () {
			++month;
			if (month > 11) {
				month = 0;
				year += 1;
			}
			drawInteractiveCalendar('calendar');
		});
		return inputNext;
	}



	function drawInteractiveCalendar(id) {
	drawCalendar(data.getFullYear(), data.getMonth(), 'calendar');

	}
drawInteractiveCalendar('calendar');