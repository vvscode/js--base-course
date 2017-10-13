var data = new Date();

function drawCalendar(year, month, id) {
	month = month - 1;

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

	function getPrev() {
		var span = document.createElement('span');
		span.className = "before";
		span.innerHTML = " <   ";
		p.insertBefore(span, p.firstChild);
		span.style.cursor="pointer";
	}

	function getNext() {
		var span = document.createElement('span');
		span.className = "after";
		span.innerHTML = " > ";
		p.appendChild(span);
		span.style.cursor="pointer";
	}

	getPrev();
	getNext();
}

/*document.getElementsByClassName('before').addEventListener("click", function(){ // Вот здесь всегда ошибка

});*/


writeMonthAndYear('calendar');

drawCalendar(2017, 1, 'calendar');