function Calendar(config) {
  const { el, showControls, allowAddEvents, allowRemoveEvents, className, title } = config;

  this.el = el;
  this.showControls = showControls;
  this.allowAddEvents = allowAddEvents;
  this.allowRemoveEvents = allowRemoveEvents;
  this.className = className;
  this.title = title;

  this.id = this.el.substring(1, 4);


  this.run = function() {
    var currentDate = new Date();
    var events = {};

    var id = this.id;
    var mainDiv = document.getElementById(this.id);

    loadEvents();

    renderButtons();
    renderCalendar();

    mainDiv.addEventListener('dblclick', addUserEvent);
    mainDiv.addEventListener('click', deleteUserEvent);
    mainDiv.addEventListener('click', handleButton);

    function loadEvents() {
      var calendarData = localStorage.getItem('calendarData')[id];
      if(calendarData) {
        events = JSON.parse(calendarData);
      }
    }

    function renderButtons() {
      var leftButton = document.createElement('button');
      leftButton.className = 'btn-back';
      leftButton.innerText = '<'
      mainDiv.appendChild(leftButton);

      var rightButton = document.createElement('button');
      rightButton.className = 'btn-forward';
      rightButton.innerText = '>';
      mainDiv.appendChild(rightButton);
    }

    function handleButton(event) {
      if(event.target.tagName.toLowerCase() !== 'button') return;
      var num;
      event.target.classList[0] === 'btn-forward' ? num = 1 : num = -1
      currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + num));

      var delete1 = document.querySelector('table');
      var delete2 = document.querySelector('.title');
      delete2.remove();
      delete1.parentNode.removeChild(delete1);
      renderCalendar();
    }

    function renderCalendar() {

      var div = document.createElement('div');
      div.className = 'title';
      div.innerHTML = currentDate.getFullYear() + '/' + (currentDate.getMonth()+1);
      document.body.appendChild(div);

      var table = document.createElement('table');
      table.className = 'table table-bordered';
      table.innerHTML = '<tbody><tr></tr></tbody>';
      var thead = document.createElement('thead');
      thead.innerHTML
      var tr = document.createElement('tr');
      var thName = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

      for (var i = 0; i < thName.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = thName[i];
        tr.appendChild(th);
      }

      thead.insertBefore(tr, thead.childNodes[0]);

      table.insertBefore(thead, table.childNodes[0]);

      var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
      if(firstDay === 0) firstDay = 7;

      var tbody = table.querySelector('tbody');

      var day = 1;
      while (day <= new Date(currentDate.getFullYear(), (currentDate.getMonth()+1), 0).getDate()) {

        tr = table.querySelectorAll('tr');

        if(day === 1 ) {
          for (var i = day; i < firstDay; i++) {
            tr[tr.length-1].innerHTML += '<td></td>';
          }
        }

        var td = document.createElement('td');
        td.innerHTML = day;
        td.className = String(day).length === 1 ? '0' + day : day;
        tr[tr.length-1].appendChild(td);

        if(tr[tr.length-1].childElementCount > 6) {
          tbody.innerHTML += '<tr></tr>';
        }

        day++;
      }

      main.appendChild(table);

      renderEvents();

    }

    function renderEvents() {
      for (var eventDate in events) {
        if(eventDate.substring(0, 8) === currentDate.toISOString().substring(0, 8)) {
          var eventDay = document.getElementsByClassName(`${String(eventDate.substring(8, 10))}`);
          renderEvent(eventDay[0], events[eventDate]);
        }
      }
    }

    function addUserEvent() {
      if(event.target.tagName.toLowerCase() !== 'td') return;

      var text = prompt('What will you do?');

      renderEvent(event.target, text);
      saveEventToLocalStorage(event, text);
    }

    function renderEvent(where, text) {
      var div = document.createElement('div');
      div.className = 'event ' + where.className;
      div.innerHTML = '<span class="delete">x</span>' + '<br>' + text;

      where.appendChild(div);
    }

    function saveEventToLocalStorage(event, text) {
      var saveDate = currentDate.toISOString().substring(0, 8) + event.target.className;

      if (events[saveDate]) {
        return;
        events[saveDate].push(text);
      } else {
        events[saveDate] = text;
      }

      localStorage.setItem('calendarData', JSON.stringify(events));
    }

    function deleteEventFromLocalStorage(event) {
      var deleteDate = currentDate.toISOString().substring(0, 8) + event.target.parentNode.classList[1];
      delete events[deleteDate];
      localStorage.setItem('calendarData', JSON.stringify(events));
    }

    function deleteUserEvent() {
      if(event.target.tagName.toLowerCase() !== 'span') return;
      event.target.parentNode.remove();

      deleteEventFromLocalStorage(event);
    }
  }
}
