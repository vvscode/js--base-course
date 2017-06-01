// var url = 'https://cdn.rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/buildRawGit/index.html';
// var newUrl = '';

var button = document.querySelector('button');
button.addEventListener('click', handleButtonClick);


function handleButtonClick() {
  event.preventDefault();

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

  var copy = document.getElementById('copy-code');
  // copy.parentNode.style.display = 'block';
  copy.innerText = text;
  copy.focus();
  copy.select();
}
