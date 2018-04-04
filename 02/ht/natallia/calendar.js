var calendar = document.querySelector('#calendar');
var calendarHeader = document.querySelector('#calendar-header');
var res = document.querySelector('#result');
var date = new Date();
var currentMonth = date.getMonth() + 1;
var currentYear = date.getFullYear();
res.innerHTML = localStorage.getItem('saveValue');

function createCalendar(year, month) {
  --month;
  var rows = [];
  var d = new Date(year, month);
  var topRow = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  rows = [topRow];
  var mon = d.getMonth();
  var row = [];
  var numDaysOfMonth = 0;
  var i = 0;

  rows.push(row);

  while (i < getDay(d)) {
    row.push(null);
    i++;
  }

  while (i < 7) {
    row.push(d.getDate());
    d.setDate(d.getDate() + 1);
    i++;
    numDaysOfMonth++;
  }

  while (mon == d.getMonth()) {
    i = 0;

    if (i % 7 === 0) {
      var nextRow = [];
      rows.push(nextRow);

      while (i < 7 && mon == d.getMonth()) {
        d.setDate(d.getDate() + 1);
        numDaysOfMonth++;
        nextRow.push(numDaysOfMonth);
        i++;
      }

      while (i < 7) {
        nextRow.push(null);
        i++;
      }
    }
  }
  return rows;
}

function drawCalendar(year, month, htmlEl) {
  var result;
  var count = 0;
  var rows = createCalendar(year, month);
  result =
    '<table id="table" class="calendar__table"><tr class="calendar__row calendar__row--header">';

  rows.forEach(function(elem) {
    if (count === 0) {
      elem.forEach(function(el) {
        result +=
          '<th class="calendar__cell calendar__cell--header">' + el + '</th>';
      });
      result += '</tr>';
    } else {
      result += '<tr class="calendar__row">';
      elem.forEach(function(el) {
        if (!el) {
          result += '<td class="calendar__cell"></td>';
        } else {
          result += '<td class="calendar__cell">' + el + '</td>';
        }
      });
      result += '</tr>';
    }
    count++;
  });

  result += '</tr>';

  result += '</table>';
  htmlEl.innerHTML = result;
}

function getDay(date) {
  var day = date.getDay();

  if (day === 0) {
    day = 7;
  }
  return day - 1;
}

function writeMonthAndYear(year, month, htmlElHeader) {
  --month;
  date = new Date(year, month);
  var writeMonth = date.toLocaleString('ru', { month: 'long' });
  var writeYear = date.toLocaleString('ru', { year: 'numeric' });
  htmlElHeader.innerHTML =
    '<button data-btn="prev" class="btn calendar-header__btn  calendar-header__btn--prev"><img src="img/prev.png" alt="previous"></button><span class="calendar-header__span">' +
    writeMonth +
    ' ' +
    writeYear +
    '</span><button data-btn="next" class="btn calendar-header__btn calendar-header__btn--next"><img src="img/next.png" alt="next"></button>';
}

function getPrevMonth(htmlEl, month, year, htmlElHeader) {
  var prev = htmlElHeader.querySelector('button[data-btn="prev"]');
  prev.addEventListener('click', function() {
    --month;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    date = new Date(year, month);
    drawInteractiveCalendar(htmlEl, year, month, htmlElHeader);
    return date;
  });
}

function getNextMonth(htmlEl, month, year, htmlElHeader) {
  var next = htmlElHeader.querySelector('button[data-btn="next"]');
  next.addEventListener('click', function() {
    ++month;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    date = new Date(year, month);
    drawInteractiveCalendar(htmlEl, year, month, htmlElHeader);
    return date;
  });
}

function drawInteractiveCalendar(htmlEl, year, month, htmlElHeader) {
  drawCalendar(year, month, htmlEl);
  writeMonthAndYear(year, month, htmlElHeader);
  getPrevMonth(htmlEl, month, year, htmlElHeader);
  getNextMonth(htmlEl, month, year, htmlElHeader);
}

drawInteractiveCalendar(calendar, currentYear, currentMonth, calendarHeader);

calendar.addEventListener('click', function(e) {
  var target = e.target;
  if (target.tagName === 'TD' && target.innerHTML !== '') {
    var selectMonth = date.toLocaleString('ru', { month: 'long' });
    var selectYear = date.getFullYear();
    var p = document.createElement('p');
    res.appendChild(p);
    p.innerHTML =
      'Вы выбрали дату ' +
      selectMonth +
      ' ' +
      target.innerHTML +
      ', ' +
      selectYear +
      '.';
    setTimeout(getLocalStorage, 100);
    function getLocalStorage() {
      if (!localStorage.saveValue) {
        localStorage.saveValue = p.innerHTML + '</br>';
      } else {
        localStorage.saveValue += p.innerHTML + '</br>';
      }
    }
  }
});
