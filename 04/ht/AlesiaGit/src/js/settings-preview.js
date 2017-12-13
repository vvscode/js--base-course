class settingsPreview {
	constructor(settings) {
		document.getElementById("settings-preview").innerHTML =
			"<pre><code></br>\
		&lt;script&gt;<br/>\
			new calendarPreview ({<br/>\
				id:" +
			settings.id +
			",<br/>\
				month:" +
			settings.month +
			",<br/>\
				year:" +
			settings.year +
			",<br/>\
				addTasks:" +
			settings.addTasks +
			",<br/>\
				removeTasks:" +
			settings.removeTasks +
			",<br/>\
				rulers:" +
			settings.rulers +
			",<br/>\
			});<br/>\
		&lt;/script&gt;</code></pre>";
	}
}
