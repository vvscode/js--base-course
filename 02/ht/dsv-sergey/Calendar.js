/* eslint-disable semi */
showCalendar.onclick = function(){drawInteractiveCalendar('calendar')};

function drawInteractiveCalendar(el) {
    var htmlEl = document.getElementById(el),
        today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1;
    drawCalendar(year, month, htmlEl);
    addCaption(year, month, htmlEl);
}

function addCaption(year, month, htmlEl) {
    var caption = document.createElement("caption"),
        captionText = '',
        table = document.getElementById("myCalendar"),
        monthRU = {
            0: "Январь",
            1: "Февраль",
            2: "Март",
            3: "Апрель",
            4: "Май",
            5: "Июнь",
            6: "Июль",
            7: "Август",
            8: "Сентябрь",
            9: "Октябрь",
            10: "Ноябрь",
            11: "Декабрь"
        };
    captionText =
        "<div style='display: flex; flex-direction: row; justify-content: space-between'><button id='earlyMonth'><</button><h3> --- " +
        monthRU[month - 1] +
        "  " +
        year +
        " --- </h3><button id='nextMonth'>></button></div>";
    caption.innerHTML = captionText;
    table.insertBefore(caption, table.firstChild);
    earlyMonth.onclick = function() {
        if (month == 1) {
            drawCalendar(year - 1, 12, htmlEl);
            addCaption(year - 1, 12, htmlEl);
        } else {
            drawCalendar(year, month - 1, htmlEl);
            addCaption(year, month - 1, htmlEl);
        }
    };
    nextMonth.onclick = function() {
        if (month == 12) {
            drawCalendar(year + 1, 1, htmlEl);
            addCaption(year + 1, 1, htmlEl);
        } else {
            drawCalendar(year, month + 1, htmlEl);
            addCaption(year, month + 1, htmlEl);
        }
    };
}

function drawCalendar(year, month, htmlEl) {
  var date = new Date(year, month - 1),
    today = date.getDate(),
    firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0
        ? 7
        : new Date(date.getFullYear(), date.getMonth(), 1).getDay(), // Определения дня недели 1-го числа
    dayRU = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"},
    calendar = "<h2 style=\'text-align: center\'>Календарь</h2>" +
      "<table id='myCalendar' style='width: 300px; height: 250px'>" +
      "<tr><th>" +
      dayRU[1] +
      "</th><th>" +
      dayRU[2] +
      "</th><th>" +
      dayRU[3] +
      "</th><th>" +
      dayRU[4] +
      "</th><th>" +
      dayRU[5] +
      "</th><th>" +
      dayRU[6] +
      "</th><th>" +
      dayRU[0] +
      "</th></tr>",
    dayInMonth =
      33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate(), // Определение количества дней в месяце, с 32 в Сафари баг
    countDay = 1;
  for (var i = 1; i <= 6; i++) {
    // Цикл по неделям
    calendar = calendar + "<tr>";
    for (var k = 1; k <= 7; k++) {
      // Цикл по дням недели
      if (i === 1 && k !== firstDay && countDay === 1) {
        calendar = calendar + "<td></td>";
      } else {
        if (countDay <= dayInMonth) {
          calendar = calendar + "<td>" + countDay + "</td>"; // Запись числа в день недели
          countDay++; // Глобальный счетчик
        } else calendar = calendar + "<td></td>";
      }
    }
    calendar = calendar + "</tr>";
  }
  calendar = calendar + "</table>";
  htmlEl.innerHTML = calendar;
// eslint-disable-next-line eol-last
}