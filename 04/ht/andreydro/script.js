"use strict";

window.onhashchange = function() {
	displayPage(window.location.hash || "#1");
};

displayPage(window.location.hash || "#1");

function displayPage(hash) {
	if (hash == "#1") {
		displayCalendar();
	} else if (hash == "#2") {
		displayCreate();
	} else if (hash == "#3") {
		displayAuthor();
	}
}

function displayCalendar() {
	var content = document.getElementById("content");
	content.innerHTML = "";

	var calendar = document.createElement("div");
	calendar.id = "calendar";
	content.appendChild(calendar);

	var newCalendar = new Calendar({
		element: "#calendar",
		changeMonth: true,
		addNotes: true,
		removeNotes: true,
		showMonth: true
	});
}

function displayCreate() {
	var content = document.getElementById("content");

	var createCode = document.getElementById("createCode");
	content.innerHTML = createCode.innerHTML;

	var params = {
		element: "#calendarSettings",
		changeMonth: true,
		addNotes: true,
		removeNotes: true,
		showMonth: true
	};

	content.querySelector("#changeMonth").onchange = function(e) {
		params.changeMonth = e.target.checked;
		new Calendar(params);
		displayCode();
	};
	content.querySelector("#addNotes").onchange = function(e) {
		params.addNotes = e.target.checked;
		new Calendar(params);
		displayCode();
	};
	content.querySelector("#removeNotes").onchange = function(e) {
		params.removeNotes = e.target.checked;
		new Calendar(params);
		displayCode();
	};
	content.querySelector("#showMonth").onchange = function(e) {
		params.showMonth = e.target.checked;
		new Calendar(params);
		displayCode();
	};

	new Calendar(params);
	displayCode();

	function displayCode() {
		var code = document.getElementById("code");
		code.innerText =
			"var calendar = new Calendar({\n" +
			' element: "' +
			params.element +
			'", \n' +
			" changeMonth: " +
			params.changeMonth +
			", \n" +
			" addNotes: " +
			params.addNotes +
			", \n" +
			" removeNotes: " +
			params.removeNotes +
			", \n" +
			" showMonth: " +
			params.showMonth +
			",\n" +
			"});";
	}
	}

function displayAuthor() {
	var content = document.getElementById("content");
	var about = document.getElementById("about");
	content.innerHTML = about.innerHTML;
}

function Calendar(options) {

	var htmlElement = document.querySelector(options.element);

	var table =
		'<table><thead><tr><td class="left-button"><button class="left">&lt;</button></td>' +
		'<td class="month" colspan="3"></td><td class="year" colspan="2"></td><td class="right-button">' +
		'<button class="right">&gt;</button></td></tr>';
	table +=
		"<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr></thead>";

	table += "<tbody></tbody>";

	htmlElement.innerHTML = table + "</table>";

	var tbody = htmlElement.querySelector("tbody");

	var calendar = new Date();
	calendar.setDate(1);
	var month = htmlElement.querySelector("td.month");
	var year = htmlElement.querySelector("td.year");

	var months = [
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

	var storage;
	var storageJSON = localStorage.getItem("calendar" + options.element);
	if (storageJSON) {
		storage = JSON.parse(storageJSON);
	} else {
		storage = {};
	}

	addDays();

	function addDays() {
		var date = new Date(calendar);
		date.setDate(1);
		if (options.showMonth) {
			month.innerText = months[date.getMonth()];
			year.innerText = date.getFullYear();
		}

		var table = "";

		if (date.getDay() != 1) {
			table += "<tr>";
			var last = date.getDay() || 7;
			for (var i = 1; i < last; i++) {
				table += "<td></td>";
			}
		}

		while (date.getMonth() == calendar.getMonth()) {
			if (date.getDay() == 1) {
				table += "<tr>";
			}
			table += '<td day="' + date.getDate() + '">' + date.getDate() + "</td>";
			if (date.getDay() == 0) {
				table += "</tr>";
			}
			date.setDate(date.getDate() + 1);
		}

		if (date.getDay() != 1) {
			while (date.getDay() != 1) {
				table += '<td class="months">' + date.getDate() + "</td>";
				date.setDate(date.getDate() + 1);
			}
		}

		if (date.getDay() != 1) {
			table += "</tr>";
		}

		tbody.innerHTML = table;

		for (var time in storage) {
			var today = new Date(+time);

			if (
				today.getFullYear() == calendar.getFullYear() &&
				today.getMonth() == calendar.getMonth()
			) {
				var td = tbody.querySelector('td[day="' + today.getDate() + '"]');

				var notes = td.querySelector("div");
				if (!notes) {
					notes = document.createElement("div");
					td.appendChild(notes);
				}

				var notesList = storage[time];
				for (var i = 0; i < notesList.lenght; i++) {
					var p = createNote(notesList[i], time, i);
					notes.appendChild(p);
				}
			}
		}
	}
  
	if (options.changeMonth) {
		htmlElement.querySelector("button.left").onclick = function() {
			calendar.setMonth(calendar.getMonth() - 1);
			addDays();
		};
		htmlElement.querySelector("button.right").onclick = function() {
			calendar.setMonth(calendar.getMonth() + 1);
			addDays();
		};
	} else {
		htmlElement.querySelector("button.left").style.display = "none";
		htmlElement.querySelector("button.right").style.display = "none";
	}

	tbody.addEventListener("dblclick", function(e) {
		if (!options.addNotes) {
			return;
		}

		var day = +e.target.getAttribute("day");
		if (day) {
			var notes = e.target.querySelector("div");
			if (!notes) {
				notes = document.createElement("div");
				e.target.appendChild(notes);
			}

			var noteUser = prompt("What do you want to do?");
			if (!noteUser) {
				return;
			}

			var today = new Date(calendar.getFullYear(), calendar.getMonth(), day);

			var notesList = storage[today.getTime()];
			if (!notesList) {
				notesList = [];
				storage[today.getTime()] = notesList;
			}

			notesList.push(noteUser);
			var p = createNote(noteUser, today.getTime(), notesList.length - 1);
			notes.appendChild(p);

			localStorage.setItem(
				"calendar" + options.element,
				JSON.stringify(storage)
			);
		}
	});

	function createNote(text, time, index) {
		var p = document.createElement("p");
		p.innerText = text;
		if (options.removeNotes) {
			var a = document.createElement("a");
			a.innerText = "x";
			a.href = "#";
			a.className = "del";
			a.onclick = function() {
				if (confirm("Do you want to delete the note? ")) {
					p.parentNode.removeChild(p);
					var notesListDel = storage[time];
					notesListDel.splice(index, 1);
					localStorage.setItem(
						"calendar" + options.element,
						JSON.stringify(storage)
					);
				}
				return false;
			};
			p.appendChild(a);
		}
		return p;
	}

}