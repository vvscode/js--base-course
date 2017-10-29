function getDay(date) {
	var day = date.getDay();
	if (day == 0) day = 7;
	return day - 1;
}

function drawCalendar(settings) {
	var d = new Date(settings.year, settings.month - 1);
	var mon = settings.month - 1;
	
	var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
	
	for (var i = 0; i < getDay(d); i++) {
		table += '<td></td>';
	}
	
	while (d.getMonth() == mon) {
		table += '<td>' + d.getDate() + '</td>';

		if (getDay(d) % 7 == 6) {
			table += '</tr><tr>';
		}
		
		d.setDate(d.getDate() + 1);
	}
	
	if (getDay(d) != 0) {
		for (var i = getDay(d); i < 7; i++) {
			table += '<td></td>';
		}
	}
	
	table += '</tr></table>';
	if (settings.showCurrent) {
		current.innerText = settings.month + ' / ' + settings.year;
	}
	calendar.innerHTML += table;
}

function addNote(settings, storageID) {
	function addNoteToCell(calendarCell, noteComment, settings, storageID) {
		var newNote = document.createElement('div');
		newNote.innerHTML += noteComment;
		newNote.className += 'note';
		calendarCell.appendChild(newNote);
					if (settings.removeNotes) {
						var removeBtn = document.createElement('button');
						removeBtn.innerHTML = 'x';
						removeBtn.className += 'rmNote';
						newNote.appendChild(removeBtn);
					}
		
		localStorage.setItem(storageID, calendar.innerHTML);
		
	}
	
	calendar.addEventListener('click', function () {
		var target = event.target;
		if (target.tagName === 'TD' && target.innerHTML) {
			var noteComment = prompt('Напишите комментарий', 'Важное событие');
			if (noteComment === '') {
				addNoteToCell(target, "Без описания", settings, storageID);
			}
			if (noteComment) {
				addNoteToCell(target, noteComment, settings, storageID);
			}
		}
		
	});
}

function removeNote(settings, storageID) {
	if (!settings.removeNotes || !settings.addNotes) return;
	calendar.addEventListener('click', function (event, storageID) {
		var target = event.target;
		if (target.className === 'rmNote' && confirm('Удалить запись "' + target.parentNode.innerText + '"?')) {
			target.parentNode.remove();
		}
		localStorage.setItem(storageID, calendar.innerHTML);
	});
}

function createButtons(settings, storageID) {
	var calendarHead = document.getElementById('calendar-head');
	var prevMnthBtn = document.createElement('button');
	prevMnthBtn.innerText = '[ < ]';
	prevMnthBtn.id = 'prev';
	var nextMnthBtn = document.createElement('button');
	nextMnthBtn.innerText = '[ > ]';
	nextMnthBtn.id = 'next';
	calendarHead.appendChild(prevMnthBtn);
	calendarHead.appendChild(nextMnthBtn);
	prevMnthBtn.addEventListener('click', function () {
		drawInteractiveCalendar(settings);
	});
	nextMnthBtn.addEventListener('click', function () {
		drawInteractiveCalendar(settings);
	});
}

function drawInteractiveCalendar(settings) {
	document.getElementById('content').innerHTML = null;
	var el = document.createElement('div');
	document.getElementById('content').appendChild(el);

	var calendar = document.createElement('div');
	calendar.id = 'calendar';
	
	var storageID = settings.year + '' + settings.month;
	if (storageID in localStorage) {
		calendar.innerHTML = localStorage.getItem(storageID);
		el.appendChild(calendar);
		return;
	}
	var calendarHead = document.createElement('div');
	calendarHead.id = 'calendar-head';
	calendar.appendChild(calendarHead);

	el.appendChild(calendar);
	
	if (settings.changeMonth) {
		createButtons(settings);
	}
	if (settings.showCurrent) {
		var current = document.createElement('div');
		current.id = 'current';
		calendarHead.insertBefore(current, calendarHead.lastChild);
	}
	addNote(settings, storageID);
	removeNote(settings, storageID);
	drawCalendar(settings, storageID);

	localStorage.setItem(storageID, calendar.innerHTML);
	console.log(localStorage);
	
}
drawInteractiveCalendar(settings);