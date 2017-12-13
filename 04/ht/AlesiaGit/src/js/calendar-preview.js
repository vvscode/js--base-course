class calendarPreview {
	constructor(settings) {
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

		document.getElementById("calendar-preview").innerHTML =
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
}
