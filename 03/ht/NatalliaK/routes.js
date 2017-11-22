var ROUTES = {
	calendar: function() {
		drawInteractiveCalendar('#calendar');
		document.querySelector('#createCalendar').innerHTML = '';
	},
	createCalendar: function() {
		createForm('#createCalendar');
		document.querySelector('#calendar').innerHTML = '';
	},
	'': function() {
		window.location.hash='createCalendar';
	},
};

// Создать обработчик URL
function handleUrl() {
  var url = window.location.hash.replace('#', '');
	ROUTES[url]();
}

// Подписаться на изменения URL
window.addEventListener('hashchange', handleUrl);

// При загрузке страницы - считать состояние и запустить обработчик
handleUrl();
