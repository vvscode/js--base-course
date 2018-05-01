var htmlEl = document.getElementById("calendar"),
  earlyMonth = document.getElementById("leftBt"),
  nextMonth = document.getElementById("rightBt"),
  date = new Date(),
  month = date.getMonth(),
  year = date.getFullYear(),
  monthIn,
  yearIn;

function drawCalendar(year, month, htmlEl) {
  var date = new Date(year, month - 1),
    today = date.getDate(),
    firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1).getDay() === 0
        ? 7
        : new Date(date.getFullYear(), date.getMonth(), 1).getDay(), // Определения дня недели 1-го числа
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
    },
    dayRU = { 0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб" },
    calendar =
      "<table><caption>" +
      monthRU[date.getMonth()] +
      " " +
      year +
      "</caption>" +
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
  monthIn = date.getMonth();
  yearIn = date.getFullYear();
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
  earlyMonth.innerHTML = monthRU[monthIn - 1 < 0 ? 11 : monthIn - 1];
  nextMonth.innerHTML = monthRU[monthIn + 1 > 11 ? 0 : monthIn + 1];
  earlyMonth.addEventListener("click", clickEarly);
  nextMonth.addEventListener("click", clickNext);
}
function clickEarly() {
  if (monthIn === -1) {
    drawCalendar(yearIn - 1, 12, htmlEl);
  }
  drawCalendar(yearIn, monthIn, htmlEl);
}
function clickNext() {
  if (monthIn === 11) {
    drawCalendar(yearIn + 1, 0, htmlEl);
  }
  drawCalendar(yearIn, monthIn + 2, htmlEl);
}
drawCalendar(year, month, htmlEl);
