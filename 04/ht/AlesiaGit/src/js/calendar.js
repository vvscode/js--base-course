class createCalendar {
	constructor(id) {
		var settings = JSON.parse(localStorage.getItem(id)) || [];

		var d = new Date();
		var leftRuler = settings.rulers === true ? "<" : "";
		var rightRuler = settings.rulers === true ? ">" : "";
		var month = parseInt(settings.month);
		var year = parseInt(settings.year);
		var calendar = this.buildCalendar(year, month, settings.id);

		var monthName = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];

		document.getElementById("root").innerHTML =
			'<div class="calendar__header">\
				<div class="calendar__ruler" id="left-ruler">' +
			leftRuler +
			'</div>\
				<div class="calendar__title" id="current-month">' +
			monthName[month] +
			'</div>\
				<div class="calendar__ruler" id="right-ruler">' +
			rightRuler +
			'</div>\
			</div>\
			<div class="calendar" id="calendar">' +
			calendar +
			"</div>";

		this.fillCalendarWithNotes(settings.id);

		if (settings.addTasks === true) {
			document
				.getElementById("calendar")
				.addEventListener(
					"click",
					this.addNote.bind(this, settings.id)
				);
		}

		if (settings.removeTasks === true) {
			document
				.getElementById("calendar")
				.addEventListener(
					"click",
					this.removeNote.bind(this, settings.id)
				);
		}

		if (settings.rulers === true) {
			document
				.getElementById("left-ruler")
				.addEventListener(
					"click",
					this.prevMonth.bind(this, settings.id)
				);
			document
				.getElementById("right-ruler")
				.addEventListener(
					"click",
					this.nextMonth.bind(this, settings.id)
				);
		}
	}

	fillCalendarWithNotes(calendarId) {
		var cells = document.getElementsByClassName("calendar__table-cell");

		cells = Array.prototype.filter.call(cells, function(elem) {
			var data = JSON.parse(localStorage.getItem(elem.id));
			if (data !== null) {
				var key = Object.keys(data[0])[0];
				var note = data[0][key];
				if (document.getElementById(elem.id)) {
					document.getElementById(elem.id).innerHTML +=
						'<div class="note">\
					<div class="note__text" id="' +
						key +
						'">' +
						note +
						'</div>\
					<a class="note__delete"></a>\
					</div>';
				}
			}
		});
	}

	addNote(calendarId, event) {
		var table = document.getElementById("calendar");
		var target = event.target;
		var parent = target.parentNode;

		while (
			target !== table &&
			target.className !==
				"calendar__table-cell calendar__table-cell-empty"
		) {
			if (target.className === "note__delete") {
				return;
			}

			if (target.tagName === "TD") {
				this.callNoteForm(target, calendarId);
			}

			target = target.parentNode;
		}
	}

	callNoteForm(target, calendarId) {
		new noteForm();

		document
			.getElementById("note-form-submit")
			.addEventListener(
				"click",
				this.getUserInput.bind(this, target, calendarId)
			);

		document
			.getElementById("note-form-cancel")
			.addEventListener("click", this.deleteNoteForm.bind(this));
	}

	deleteNoteForm() {
		var note = document.getElementsByClassName("note-form")[0];
		note.parentNode.removeChild(note);
	}

	getUserInput(target, calendarId) {
		var note = document.getElementById("note-form-text").value;

		if (note) {
			var d = new Date();
			var noteId = d.getTime();
			var cellId = target.id;

			target.innerHTML +=
				'<div class="note">\
			<div class="note__text" id="' +
				noteId +
				'">' +
				note +
				'</div>\
			<a class="note__delete"></a>\
			</div>';

			this.saveNoteToStorage(note, noteId, cellId, calendarId);
			this.deleteNoteForm();
		} else {
			this.deleteNoteForm();
		}
	}

	removeNote(calendarId, event) {
		var table = document.getElementById("calendar");
		var target = event.target;
		var parent = target.parentNode;

		while (target !== table) {
			if (target.className === "note__delete") {
				var cellId = parent.parentNode.id;
				var noteId = parent.getElementsByClassName("note__text")[0].id;
				var arr = JSON.parse(localStorage.getItem(cellId)) || [];

				arr = arr.filter(function(elem) {
					return Object.keys(elem)[0] !== noteId;
				});

				if (arr.length === 0) {
					localStorage.removeItem(cellId);
					parent.parentNode.removeChild(parent);
					return;
				}

				localStorage.setItem(cellId, JSON.stringify(arr));
				parent.parentNode.removeChild(parent);

				return;
			}

			target = target.parentNode;
		}
	}

	saveNoteToStorage(noteText, noteId, cellId, calendarId) {
		var arr = JSON.parse(localStorage.getItem(cellId)) || [];

		var note = {};
		note[noteId] = noteText;
		arr.push(note);

		localStorage.setItem(cellId, JSON.stringify(arr));
	}

	fixDays(weekday) {
		if (weekday == 0) {
			weekday = 7;
		}
		return weekday;
	}

	buildCalendar(year, month, calendarId) {
		var d = new Date(year, month - 1, 1);
		var n = new Date(year, month, 0);

		var table = '<table class="calendar__table"><tr>';

		if (this.fixDays(d.getDay()) > 1) {
			for (var i = 1; i < this.fixDays(d.getDay()); i++) {
				table +=
					'<td class="calendar__table-cell calendar__table-cell-empty">\
				<div class="date">' +
					" " +
					"</div>\
				</td>";
			}
		}

		for (var i = 1; i <= n.getDate(); i++) {
			table +=
				'<td class="calendar__table-cell" id=' +
				calendarId +
				":" +
				d.getTime() +
				'>\
			<div class="date">' +
				i +
				"</div>\
			</td>";

			if (this.fixDays(d.getDay()) == 7) {
				table += "</tr><tr>";
			}
			d.setDate(d.getDate() + 1);
		}

		if (this.fixDays(n.getDay()) < 7) {
			for (var i = this.fixDays(n.getDay()); i < 7; i++) {
				table +=
					'<td class="calendar__table-cell calendar__table-cell-empty">\
				<div class="date">' +
					" " +
					"</div>\
				</td>";
			}
		}

		return table + "</tr></table>";
	}

	nextMonth(id) {
		var settings = JSON.parse(localStorage.getItem(id)) || [];

		var month = parseInt(settings.month);
		month = (month + 1) % 12;
		settings.month = month;

		localStorage.setItem(id, JSON.stringify(settings));

		new createCalendar(id);
	}

	prevMonth(id) {
		var settings = JSON.parse(localStorage.getItem(id)) || [];

		var month = parseInt(settings.month);
		if (--month < 0) {
			month = 11;
		} else {
			month = month;
		}
		settings.month = month;

		localStorage.setItem(id, JSON.stringify(settings));

		new createCalendar(id);
	}
}
