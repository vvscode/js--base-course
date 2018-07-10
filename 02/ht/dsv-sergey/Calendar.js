/* eslint-disable semi */
var list = localStorage;

showCalendar.onclick = function() {
  drawInteractiveCalendar('calendar');
};

function drawInteractiveCalendar(idEl) {
  var htmlEl = document.getElementById(idEl),
    today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth() + 1;
  drawCalendar(year, month, htmlEl);
  addHtmlElements(year, month, htmlEl);
}

function addHtmlElements(year, month, htmlEl) {
  var caption = document.createElement('caption'),
    captionText = '',
    table = document.getElementById('myCalendar'),
    selectItem = document.querySelectorAll('.day'),
    monthRU = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

  captionText =
    "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
    "<button id='earlyMonth' style='width: auto; min-width: 50px; background: #adff2f'><</button><h3 id='captionDate' style='width: auto'> --- " +
    monthRU[month - 1] +
    "  " +
    year +
    " --- </h3><button id='nextMonth' style='width: auto; min-width: 50px; background: #adff2f'>></button></div>";

  caption.innerHTML = captionText;
  table.insertBefore(caption, table.firstChild);

  var messages = document.createElement("div");
  messages.className = "messages";
  messages.style.cssText =
    "height: auto; width: auto; margin-top: 20px; border: 3px double black; text-align: left; padding-left: 10px";
  table.parentNode.appendChild(messages);

  var resetButton = document.createElement("button");
  resetButton.idName = "resetButton";
  resetButton.style.cssText =
    "height: 26px; width: auto; margin-top: 30px; text-alighn: center";
  resetButton.innerText = "Reset";
  table.parentNode.appendChild(resetButton);

  if (list != undefined) {
     for (var i = 0; i < list.length; i++) {
      var block = document.getElementsByClassName("messages"),
        clickOutput = document.createElement("p"),
        item = list.key(i);
      clickOutput.className = "message";
      clickOutput.style.cssText = "height: auto; width: auto";
      clickOutput.innerHTML = item + ": " + list.getItem(item);
      block[0].appendChild(clickOutput);
     }
  }

  earlyMonth.onclick = function() {
    if (month == 1) {
      drawCalendar(year - 1, 12, htmlEl);
      addHtmlElements(year - 1, 12, htmlEl);
    } else {
      drawCalendar(year, month - 1, htmlEl);
      addHtmlElements(year, month - 1, htmlEl);
    }
  };

  nextMonth.onclick = function() {
    if (month == 12) {
      drawCalendar(year + 1, 1, htmlEl);
      addHtmlElements(year + 1, 1, htmlEl);
    } else {
      drawCalendar(year, month + 1, htmlEl);
      addHtmlElements(year, month + 1, htmlEl);
    }
  };

  [].forEach.call(selectItem, function(el) {
    el.addEventListener("click", addNote);
  });

  resetButton.onclick = function() {
    list.clear();
    messages.innerText = "";
  };

  function addNote(event) {
    var target = event.target,
      clickOutput,
      note = prompt("Введите заметку:"),
      dayClick = target.innerText,
      key = (dayClick < 10 ? '0' + dayClick : dayClick) + '.' + (month < 10 ? '0' + month : month) + '.' + year;
    if (note == '') { note = 'Нет заметок'; }
    clickOutput = document.createElement("p");
    clickOutput.className = "message";
    clickOutput.style.cssText = "height: auto; width: auto";
    clickOutput.innerHTML = key + ": " + note;
    list.setItem(key, note);
    var block = document.getElementsByClassName("messages");
    block[0].appendChild(clickOutput);
  }
}

function drawCalendar(year, month, htmlEl) {
  var date = new Date(year, month - 1),
    today = date.getDate(),
    firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
    firstDay = firstDayMonth === 0 ? 7 : firstDayMonth, // Определения дня недели 1-го числа
    dayRU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    calendar =
      "<h2 style='text-align: center'>Календарь</h2>" +
      "<table id='myCalendar' style='width: 500px; height: 400px; border-spacing: 1px 1px;' bgcolor='#adff2f' border='1px'>" +
      "<tr bgcolor='#7fff00'><th>" +
      dayRU[1] +
      '</th><th>' +
      dayRU[2] +
      '</th><th>' +
      dayRU[3] +
      '</th><th>' +
      dayRU[4] +
      '</th><th>' +
      dayRU[5] +
      '</th><th>' +
      dayRU[6] +
      '</th><th>' +
      dayRU[0] +
      '</th></tr>',
    dayInMonth =
      33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate(), // Определение количества дней в месяце, с 32 в Сафари баг
    countDay = 1;
  for (var i = 1; i <= 6; i++) {
    // Цикл по неделям
    calendar = calendar + '<tr>';
    for (var k = 1; k <= 7; k++) {
      // Цикл по дням недели
      if (i === 1 && k !== firstDay && countDay === 1) {
        calendar = calendar + "<td class='empty'></td>";
      } else {
        if (countDay <= dayInMonth) {
          calendar =
            calendar +
            "<td class='day' style='cursor: pointer'>" +
            countDay +
            "</td>"; // Запись числа в день недели
          countDay++; // Глобальный счетчик
        } else calendar = calendar + "<td class='empty'></td>";
      }
    }
    calendar = calendar + '</tr>';
  }
  calendar = calendar + '</table>';
  htmlEl.innerHTML = calendar;
  // eslint-disable-next-line eol-last
}
