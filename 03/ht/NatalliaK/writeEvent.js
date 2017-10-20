(function() {
	var doc = document;
	var writeEvent = doc.createElement('div');

	var close;

	var tdAll = doc.querySelectorAll('td');
	var container = doc.getElementById('calendar');
	var createCalendar = doc.getElementById('createCalendar');
	var selectedTd;

	for (let i = 0; i < tdAll.length; i++) {
		if (tdAll[i].innerHTML === '') {
			tdAll[i].className = 'empty';
		}
	}

	container.ondblclick = function (event) {

		var target = event.target;
		if (target.tagName === "TD" && target.innerHTML !== '') {

			selectTd(target);

			var userEvent = prompt("Что делать будешь?","Решать Васину задачку!");

			if (userEvent === '' || userEvent === null) {
				userEvent = 'Секретная миссия';
			}

			var userWr = document.createElement('div');

			userWr.className = 'userSelect';

			var userClass = document.querySelector('userSelect');

			userWr.innerHTML = userEvent;

			target.appendChild(userWr);

			close = doc.createElement('button');
			close.innerHTML = 'x';
			userWr.appendChild(close);

			close.onclick = function() {
				var askUser = confirm('Может все-таки задачку? Точно будешь отжиматься?');
				if (askUser){
					var el = this.parentNode;
					el.parentNode.removeChild(el);
				}
			};

			writeEvent = localStorage.getItem('savValue');
			if (localStorage.savValue === undefined) {
				localStorage.savValue = userWr.innerHTML + '<br>';
			}
			localStorage.savValue += userWr.innerHTML + '<br>';
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