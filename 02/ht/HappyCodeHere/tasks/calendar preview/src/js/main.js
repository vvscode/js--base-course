// var url = 'https://cdn.rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/buildRawGit/index.html';
// var newUrl = '';

showCalendar();


var elems = document.querySelectorAll('form input[type=checkbox], form input[type=text], form select');

for (var i = 0; i < elems.length; i++) {
  if (elems[i].type === 'text') {
    elems[i].addEventListener('input', showCalendar);

  } else if (elems[i].type === 'checkbox' || elems[i].tagName.toLowerCase() === 'select') {
    elems[i].addEventListener('change', showCalendar);

  } else {
    console.error(elems[i]);
  }
}

var textarea = document.querySelector('.copy-code textarea');
textarea.addEventListener('click', function() {
  this.select();
});

function showCalendar() {

  let id, showControls, allowAddEvents, allowRemoveEvents, className, title;

  id = document.getElementById('calendar-id').value || '123';
  showControls = document.getElementById('change-date').checked;
  allowAddEvents = document.getElementById('add-events').checked;
  allowRemoveEvents = document.getElementById('delete-events').checked;
  className = document.getElementById('classes').value || '';

  title = document.getElementById('title').value || '';

  // newUrl = `${url}?id=${id}&showControls=${showControls}&allowAddEvents=${allowAddEvents}&allowRemoveEvents=${allowRemoveEvents}&className=${className}&title=${title}`;


  var calendarShow = document.querySelector('.calendar-show');
  if (calendarShow) {
    calendarShow.remove();
  }

  var div = document.createElement('div');
  div.className = 'calendar-show';
  div.id = id;
  document.body.appendChild(div);

  new Calendar({
    el: '#' + id,
    showControls: showControls,
    allowAddEvents: allowAddEvents,
    allowRemoveEvents: allowRemoveEvents,
    className: className,
    title: title
  }).run();


  var text = `
  <!-- Bootstrap -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  <!-- Styles -->
  <link rel="stylesheet" href="https://rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/dist/css/main.css">

  <!-- Calendar widget -->
  <script src="https://rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/dist/js/main.js"></script>

  <!-- Calendar settings -->
  <script>
    (function() {
      var div = document.createElement('div');
      div.id = ${id};
      document.body.appendChild(div);

      new Calendar({
        el: '#' + '${id}',
        showControls: ${showControls},
        allowAddEvents: ${allowAddEvents},
        allowRemoveEvents: ${allowRemoveEvents},
        className: '${className}',
        title: '${title}'
      }).run();
    })();
  </script>
  `

  var copy = document.querySelector('#copy-code');
  // copy.parentNode.style.display = 'block';
  copy.value = text;
}

function debounce(func, wait) {
		var lastTime = new Date().getTime() - wait * 1000 - 1; // active first time

		return function() {
     var now = new Date().getTime();
     if(now - lastTime < wait*1000) {
       console.log('You should wait');
       return;
     }

     lastTime = now;

     console.log(now);
     func(now);
    }
}
