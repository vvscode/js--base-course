class showSettings {
	constructor() {
		document.getElementById("root").innerHTML = "";

		this.settings = document.createElement("DIV");
		this.settings.className = "settings";
		this.settings.innerHTML =
			'<div class="links__wrapper">\
				<a id="settings" class="calendar__btn" href="/">Settings</a>\
				<span class="divider">|</span>\
				<a id="calendar" class="calendar__btn" href="">Calendar</a>\
			</div>\
			<div class="settings__form form" id="settings-form">\
				<p class="settings__title">Configure calendar</p>\
				<label class="form-item"><input class="settings__checkbox" type="checkbox" id="rulers" name="rulers">allow to change month</label>\
				<label class="form-item"><input class="settings__checkbox" type="checkbox" id="add-tasks" name="add-tasks">allow to add tasks</label>\
				<label class="form-item"><input class="settings__checkbox" type="checkbox" id="remove-tasks" name="remove-tasks">allow to remove tasks</label>\
				<label class="form-item"><select id="month" class="settings__select" name="month"></select>select month</label>\
				<label class="form-item"><select id="year" class="settings__select" name="year"></select>select year</label>\
			</div>\
			<div class="preview__wrapper">\
				<div class="preview__settings" id="settings-preview"></div>\
				<div class="preview__calendar" id="calendar-preview"></div>\
			</div>';

		document.getElementById("root").appendChild(this.settings);

		this.fillMonthInput();
		this.fillYearInput();

		var d = new Date();

		document.getElementsByClassName("month-option")[
			d.getMonth()
		].selected = true;
		document.getElementsByClassName("year-option")[
			d.getFullYear() - 2010
		].selected = true;

		document
			.getElementById("settings-form")
			.addEventListener("change", this.initCalendar.bind(this));
	}

	fillMonthInput() {
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

		for (var i = 0; i < 12; i++) {
			document.getElementById("month").innerHTML +=
				'<option class="month-option" value="' +
				i +
				'">' +
				monthName[i] +
				"</option>";
		}
	}

	fillYearInput() {
		for (var i = 0; i < 10; i++) {
			document.getElementById("year").innerHTML +=
				'<option class="year-option" value="' +
				(2010 + i) +
				'">' +
				(2010 + i) +
				"</option>";
		}
	}

	initCalendar() {
		var d = new Date();

		var settings = {
			id: "c" + Math.floor(Math.random() * 3),
			month: document.getElementById("month").value || d.getMonth(),
			year: document.getElementById("year").value || d.getFullYear(),
			addTasks: document.getElementById("add-tasks").checked,
			removeTasks: document.getElementById("remove-tasks").checked,
			rulers: document.getElementById("rulers").checked
		};

		var id = settings.id;

		localStorage.setItem(id, JSON.stringify(settings));

		document.getElementById("calendar").href = "#calendar-" + id;

		new calendarPreview(settings);
		new settingsPreview(settings);
	}
}
