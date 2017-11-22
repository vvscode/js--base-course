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

function writeMonthAndYear(year, month) {
	var date = new Date(year || data.getFullYear(), month || data.getMonth());
	var writeMonth = date.toLocaleString('ru', {month: 'long'});
	var year = date.toLocaleString('ru', {year: 'numeric'});

	var p = document.querySelector("p");
	if (!p) {
		p = document.createElement("p");
		document.body.insertBefore(p, document.body.firstChild);
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

	function drawInteractiveCalendar(id, year, month) {
		year = year || data.getFullYear();
		month = month || data.getMonth();
		drawCalendar(year, month, "calendar");
		writeMonthAndYear(year, month);
		getPrev();
		getNext();
	}
drawInteractiveCalendar('calendar');


var list = document.createElement('ul');
document.body.appendChild(list);
list.innerHTML = localStorage.getItem('savValue');
var td = document.querySelector('td');
var container = document.getElementById('calendar');

container.onclick = function (event) {
	var target = event.target;
	if (target.tagName === "TD" && target.innerHTML !== '') {
		var li = document.createElement('li');
		list.appendChild(li);
		var selectDate = new Date(year, month, target.innerHTML);
		var mon = selectDate.toLocaleString('ru', {month: 'long'});
		li.innerHTML = "Вы выбрали дату: " + mon + ", " + target.innerHTML  + " " + year;
	}
	if (localStorage.savValue === undefined) {
		localStorage.savValue = li.innerHTML + '<br>';
	}
	localStorage.savValue += li.innerHTML + "<br>";
};
