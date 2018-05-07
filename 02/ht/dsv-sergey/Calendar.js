/* eslint-disable semi */
showCalendar.onclick = function() {
  drawInteractiveCalendar("calendar");
};

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
    captionText = "",
    table = document.getElementById("myCalendar"),
    selectItem = document.querySelectorAll(".day"),
    monthRU = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ];
  captionText =
    "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
    "<button id='earlyMonth' style='width: auto; min-width: 50px; background: #adff2f'><</button><h3 style='width: auto'> --- " +
    monthRU[month - 1] +
    "  " +
    year +
    " --- </h3><button id='nextMonth' style='width: auto; min-width: 50px; background: #adff2f'>></button></div>";
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
  [].forEach.call(selectItem, function(el) {
    el.click = function() {
      showClick(event);
    };
  });
    [].forEach.call(selectItem, function(el) {
        el.click = function() {
            showPrompt(event);
        };
    });
}

function showClick(event) {
  var target = event.target;
  var id = target.getElementsByClassName("day"),
    info = id.innerText,
    clickOutput = document.createElement("div");
  clickOutput.className = "messages";
  clickOutput.innerHTML = info;
  var block = document.getElementById("calendar");
  block.appendChild(clickOutput);
}

function showPrompt(event) {
    var target = event.target;

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
    calendar = calendar + "</tr>";
  }
  calendar = calendar + "</table>";
  htmlEl.innerHTML = calendar;
  // eslint-disable-next-line eol-last
}
