(function() {
	var calendar = document.getElementById('calendar');
	var form = document.querySelector('form');
	var addTask = document.querySelector('input[value="addTask"]');
	var removeTask = document.querySelector('input[value="removeTask"]');
	var div = document.createElement('div');
		form.appendChild(div);

	var value = {};

	form.onclick = function(event) {
		var target = event;

		if (target.tagName === "INPUT") {

			value.id = function() {
				let id = calendar +  Math.random();
				return ('div: ' + '#'  + id);
			};

			value.showMonth = function(showMonth) {
				return (showMonth.checked);
			};

			value.allow = function(allow) {
				return (allow.checked);
			};

			value.allowRemove = function(allowRemove) {
				return (allowRemove.checked);
			};

			value.date = function() {
				var d = document.querySelector('input[type="month"]');
				date = d.value;
			};
		}
	};

	console.log(value);

	/*	var c = new Calendar({
			div: '#' + id,
			showMonth: true,
			allow: false,
			allowRemove: true,
			date: null || date
		});*/
})();