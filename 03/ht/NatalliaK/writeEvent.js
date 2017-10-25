(function () {
	var doc = document;
	var writeEvent = doc.createElement('div');

	var close;

	var tdAll = doc.querySelectorAll('td');
	var container = doc.getElementById('calendar');
	var createCalendar = doc.getElementById('createCalendar');
	var selectedTd;
	var tdDay = '';
	var tdMonth = '';

	for (let i = 0; i < tdAll.length; i++) {
		if (tdAll[i].innerHTML === '') {
			tdAll[i].className = 'empty';
		}
	}

	container.ondblclick = function(event) {

		var target = event.target;

		if (target.tagName === "TD" && target.innerHTML !== '') {

			selectTd(target);

			var userEvent = prompt("Что делать будешь?", "Решать Васину задачку!");

			if (userEvent === '' || userEvent === null) {
				userEvent = 'Секретная миссия';
			}

			var userWr = document.createElement('div');

			userWr.className = 'userSelect';

			userWr.innerHTML = userEvent;

			target.appendChild(userWr);

			close = doc.createElement('button');
			close.innerHTML = 'x';
			userWr.appendChild(close);

			close.onclick = function () {
				var askUser = confirm('Может все-таки задачку? Точно будешь отжиматься?');
				if (askUser) {
					var el = this.parentNode;
					el.parentNode.removeChild(el);
				}
			};

			tdDay = target.getAttribute('data-date');
			tdMonth = target.getAttribute('data-month');
			var keyName = `event_for_` + tdDay + '/' + tdMonth || '';
			writeEvent = localStorage.getItem(keyName);
			if (localStorage[keyName] === undefined) {
				localStorage[keyName] = userWr.innerHTML + '<br>';
			}
			localStorage[keyName] += userWr.innerHTML + '<br>';

			for (let i = 0; i < tdAll.length; i++) {
				if (tdAll[i].dataset.date === 'tdDay' && tdAll[i].dataset.month === 'tdMonth') {
					tdAll[i].innerHTML +=localStorage[keyName];
				}
			}
		}
	};


	function selectTd(node) {
		if (selectedTd) {
			selectedTd.classList.remove('selected');
		}
		selectedTd = node;
		selectedTd.classList.add('selected');
	}

})();