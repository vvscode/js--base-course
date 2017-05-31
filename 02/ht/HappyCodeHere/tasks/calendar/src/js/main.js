function Calendar(config) {
  const { el, showControls, allowAddEvents, allowRemoveEvents, className, title } = config;

  this.el = el;
  this.showControls = showControls;
  this.allowAddEvents = allowAddEvents;
  this.allowRemoveEvents = allowRemoveEvents;
  this.className = className;
  this.title = title;

  this.id = this.el.substring(1);

  this.run = function() {
    var currentDate = new Date();

    var eventsAll = {};
    var events = {};

    var self = this;

    var mainDiv = document.getElementById(self.id);

    var calendarDiv = document.createElement('div');
    calendarDiv.className = 'my-calendar ' + self.className;

    mainDiv.appendChild(calendarDiv);


    loadEvents();

    renderHead();
    renderCalendar();

    console.error(JSON.parse( localStorage.getItem('calendarData') ));

    if(self.allowAddEvents) {
      calendarDiv.addEventListener('dblclick', addUserEvent);
    }
    if(self.allowRemoveEvents) {
      calendarDiv.addEventListener('click', deleteUserEvent);
    }

    calendarDiv.addEventListener('click', handleButton);

    function loadEvents() {
      var calendarData = localStorage.getItem('calendarData');
      calendarData = JSON.parse(calendarData);
      if(calendarData) {
        eventsAll = Object.assign({},  calendarData);

        if(calendarData[self.id]) {
          events = calendarData[self.id];
        }
      }
    }

    function renderHead() {
      var title = document.createElement('h2');
      title.innerText = self.title;

      var leftArrow = document.createElement('span');
      leftArrow.className = 'btn-control btn-back';
      leftArrow.innerText = '<'

      var rightArrow = document.createElement('span');
      rightArrow.className = 'btn-control btn-forward';
      rightArrow.innerText = '>';

      var date = document.createElement('span');
      date.className = 'date';
      date.innerHTML = currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1);

      var headDiv = document.createElement('div');
      headDiv.className = 'calendar-head';
      headDiv.appendChild(title);

      var row2 = document.createElement('div');

      if(self.showControls) {
        row2.append(leftArrow, date, rightArrow);
      } else {
        row2.append(date);
      }

      headDiv.append(row2);
      calendarDiv.appendChild(headDiv);
    }

    function handleButton(event) {
      if(event.target.classList[0] !== 'btn-control') return;
      var num;
      event.target.classList[1] === 'btn-forward' ? num = 1 : num = -1
      currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + num));

      var delete1 = calendarDiv.querySelector('table');
      delete1.parentNode.removeChild(delete1);
      renderCalendar();
    }

    function renderCalendar() {

      var date = calendarDiv.querySelector('.date');
      date.innerHTML = currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1);

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

      calendarDiv.appendChild(table);

      renderEvents();
    }

    function renderEvents() {
      for (var eventDate in events) {
        if(eventDate.substring(0, 8) === currentDate.toISOString().substring(0, 8)) {
          var eventDay = calendarDiv.getElementsByClassName(`${String(eventDate.substring(8, 10))}`);
          events[eventDate].map(item => {
            renderEvent(eventDay[0], item);
          });
        }
      }
    }

    function renderEvent(where, text) {
      var div = document.createElement('div');
      div.className = 'event ' + where.className;
      div.innerHTML = `${text}<span class="delete">x</span>`;

      where.appendChild(div);
    }

    function addUserEvent() {
      if(event.target.tagName.toLowerCase() !== 'td') return;

      var text = prompt('What will you do?', 'Go for a walk');
      if(!text) return;

      renderEvent(event.target, text);
      saveEventToLocalStorage(event, text);
    }

    function saveEventToLocalStorage(event, text) {
      var saveDate = currentDate.toISOString().substring(0, 8) + event.target.className;

      if (events[saveDate]) {
        events[saveDate].push(text);
      } else {
        let arr = [];
        arr.push(text);
        events[saveDate] = arr;
      }

      eventsAll[self.id] = events;

      localStorage.setItem('calendarData', JSON.stringify(eventsAll));
    }

    function deleteUserEvent() {
      if(event.target.className !== 'delete') return;
      event.target.parentNode.remove();

      deleteEventFromLocalStorage(event);
    }

    function deleteEventFromLocalStorage(event) {
      var deleteDate = currentDate.toISOString().substring(0, 8) + event.target.parentNode.classList[1];
      var text = event.target.parentNode.innerText.slice(0, -1);
      var index = events[deleteDate].indexOf(text);
      events[deleteDate].splice(index, 1);

      if (events[deleteDate].length === 0) delete events[deleteDate];

      eventsAll[self.id] = events;

      localStorage.setItem('calendarData', JSON.stringify(eventsAll));
    }

  }
}
