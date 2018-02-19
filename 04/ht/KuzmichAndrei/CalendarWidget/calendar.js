var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
var data = {
  el: '.block3',
  el1: '.main',
  showMonth: false,
  allowAdding: true,
  allowRemoving: true,
  allowChangingMonth: true,
  year: '',
  month: '',
};

function Calendar() {
  this.data = data;
}

var calendar = new Calendar();

Calendar.prototype.drawCalendar = function (year, month) {
  this.year = year;
  this.month = month;
  var date = new Date(this.year, this.month - 1);
  // шапка календаря;
  var calendarHead = [
    '<table class = "head" >', '<tr>', '<th>', '<button id = "L" >', '<', '</button>', '</th>',
    '<th id = "currentDate" >', `${months[month - 1]} ${date.getFullYear()}`, '</th>', '<th>', '<button id = "R" >',
    '>', '</button>', '</th>', '</table>',
  ].join('');

    // тело календаря;
  var calendarBody = '<table class = "cBody" onmousedown = "return false"><tr><th>mo</th><th>tu</th><th>we</th><th>th</th><th>fr</th><th>sa</th><th>su</th></tr><tr>';
  for (var i = 0; i < getDay(date); i++) {
    calendarBody += '<td></td>';
  }
  while (date.getMonth() === (month - 1)) {
    calendarBody += `<td class="${date.getFullYear()}-${date.getMonth()}-${date.getDate()}">${date.getDate()}</td>`;

    if (getDay(date) % 7 === 6) {
      calendarBody += '</tr><tr>';
    }

    date.setDate(date.getDate() + 1);
  }

  if (getDay(date) != 0) {
    for (var i = getDay(date); i < 7; i++) {
      calendarBody += '<td></td>';
    }
  }

  calendarBody += '</tr></table>';

  function getDay(date1) {
    var day = date1.getDay();
    if (day === 0) day = 7;
    return day - 1;
  }
  var result = calendarHead + calendarBody;
  (document.querySelector(data.el).innerHTML = result)
  && (document.querySelector(data.el1).innerHTML = result);

  document.querySelector('#currentDate').dataset.month = date.getMonth();
  document.querySelector('#currentDate').dataset.year = date.getFullYear();
};














