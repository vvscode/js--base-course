// Очистка базы данных
function clearStorage()
{
	localStorage.clear();
	location.reload();
}

// Код для виджета
function widgetCode()
{
	let id = document.querySelector('#calendar-id').value || (Math.random()*10e5).toFixed(0);
	let title = document.querySelector('#header-id').value || '';
	let cssStyles = document.querySelector('#style-id').value || '';
	let showControls = document.querySelector('#arrow-controls-id').checked;
	let allowAddEvents = document.querySelector('#allow-add-events-id').checked;
	let allowRemoveEvents = document.querySelector('#allow-remove-events-id').checked;
	let wCode = document.querySelector('#widget-code-id');

	var text = `  <!-- Styles -->
  <link rel="stylesheet" href="https://rawgit.com/seraph22/js--base-course/master/02/ht/seraph22/calendar/css/style.css">

  <!-- Base script -->
  <script src="https://rawgit.com/seraph22/js--base-course/master/02/ht/seraph22/calendar/js/calendar.js"></script>

  <!-- Widget code -->
  <script>
	(function() {
	  var div = document.createElement('div');
	  div.id = 'id${id}';
	  div.className = 'calendar';
	  document.body.appendChild(div);

	  new Calendar ({
		el: '#id' + '${id}',
		title: '${title}',
		cssStyles: '${cssStyles}',
		showControls: ${showControls},
		allowAddEvents: ${allowAddEvents},
		allowRemoveEvents: ${allowRemoveEvents}
	  });
	})();
  </script>`

	wCode.value = text;
}
widgetCode();