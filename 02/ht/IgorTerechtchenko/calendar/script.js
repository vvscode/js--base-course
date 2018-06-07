function drawCalendar(year, month, htmlEl) {
  //using linux 'cal' as an example
  var table =
    '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';

  var date = new Date(year, month - 1);

  if (date.getDay() !== 1 && date.getDay()) {
    table += '<tr>';
    for (var i = 1; i < date.getDay(); i++) {
      table += '<td></td>';
    }
  }
  if (date.getDay() === 0) {
    table += '<tr>';
    for (var i = 6; i > date.getDay(); i--) {
      table += '<td></td>';
    }
  }

  while (date.getMonth() == month - 1) {
    //starting a row before monday
    if (date.getDay() == 1) {
      table += '<tr>';
    }
    table += '<td>' + date.getDate() + '</td>';
    //closing a row after sunday
    if (date.getDay() === 0) {
      table += '</tr>'; //
    }
    date.setDate(date.getDate() + 1);
  }

  //closing last row if last day wasn't monday
  if (date.getDay() != 1) {
    table += '</tr>';
  }

  htmlEl.innerHTML = table + '</table>';
}

function drawInteractiveCalendar(year, month, el) {
  var currentMonth = month;
  var currentDate = new Date(year, month);
  var innerEl = document.createElement('div');
  var header = document.createElement('h');
  var d = document.createTextNode(' ' + currentDate.getFullYear() + ', ' + (currentDate.getMonth() + 1) + ' ');
  var storage = window.localStorage;
  var infoArea = document.createElement('div');
  header.appendChild(d);
  infoArea.innerHTML += 'info <br>'

  //creating buttons
  var leftButton = document.createElement('button');
  var rightButton = document.createElement('button');
  var r = document.createTextNode('>');
  var l = document.createTextNode('<');
  rightButton.appendChild(r);
  leftButton.appendChild(l);
  rightButton.addEventListener('click', function() {
    redrawCalendar('+');
  });
  leftButton.addEventListener('click', function() {
    redrawCalendar('-');
  });
  el.appendChild(leftButton);
  el.appendChild(header);
  el.appendChild(rightButton);

  drawCalendar(currentDate.getFullYear(), currentDate.getMonth(), innerEl);
  el.appendChild(innerEl);
  el.appendChild(infoArea);
  addDayClickListeners();
  addDateInfoField();

  function changeDate(direction) {
    if (direction === '+') {
      currentMonth++;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
    if (direction === '-') {
      currentMonth--;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
  }

  function redrawCalendar(direction) {
    changeDate(direction);
    drawCalendar(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      innerEl
    );
    header.removeChild(header.firstChild);
    //adding 1 to month because now working with js date representation
    d = document.createTextNode(
        ' ' +
        currentDate.getFullYear() +
        ', ' +
        (currentDate.getMonth() + 1) +
        ' '
    );
    header.appendChild(d);
    addDayClickListeners();
  }

  function addDayClickListeners() {
    var daysArray = el.getElementsByTagName('div')[0].getElementsByTagName('td');
    for(var i = 0; i < daysArray.length; i++) {
      daysArray[i].addEventListener('click', dayClickHandler); 
    }
  }

  function dayClickHandler(e) {
    var dateString = currentDate.getFullYear() + ' ' + (currentDate.getMonth() + 1) + ' ' + event.target.innerHTML;
    var info;
    if(event.target.innerHTML) {
      info = window.prompt('add info:', 'info'); 
      storage.setItem(dateString, info);
      infoArea.innerHTML += dateString + ' ' + info + '<br>'; 
    }
  }
  
  function addDateInfoField() {
    for(var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      infoArea.innerHTML += key + ' ' + storage.getItem(key) + '<br>'; 
    }
  }
}
