function drawSetings() {

  var today = new Date();

  var content = document.querySelector('#content');

  content.innerHTML = '<div id="setings"><br><form action="#"><input type="checkbox" id="chengeMonth" checked> возможность перелистывать месяц <br><br><input type="checkbox" id="addListItem" checked> возможность добавлять заметки <br><br><input type="checkbox" id="deliteListItem" checked> возможность удалять заметки <br><br>Показать определённый месяц и год <br><br><select name="month" id="selectedMonth"> месяц <option value="0">январь</option><option value="1">февраль</option><option value="2">март</option><option value="3">апрель</option><option value="4">май</option><option value="5">июнь</option><option value="6">июль</option><option value="7">август</option><option value="8">сентябрь</option><option value="9">октябрь</option><option value="10">ноябрь</option><option value="11">декабрь</option>    </select><input type="text" id="customYear" value=""> год</form> <br><br></div><div id="code"><textarea name="code" id="text_code" cols="40" rows="30"></textarea></div><div id="preview"></div>';

  var form = document.getElementsByTagName('form')[0];
  var code = document.getElementById('text_code');
  var preview = document.getElementById('preview');
  var chengeMonth,
      addListItem,
      deliteListItem,
      selectedMonth,
      customYear,
      setings = {};
  setings.chengeMonth = true;
  setings.addListItem = true;
  setings.deliteListItem = true;
  setings.selectedMonth = today.getMonth();
  setings.customYear = today.getFullYear();

  var codeText = 	'<div id="content"></div><script>var setings = ' + JSON.stringify(setings, null, ' ') + ';</script><script src="*ваш путь к файлу*/calendar.js"></script>';
  
  code.innerText = codeText;

  form.addEventListener('change', function () {
    //получаем значение формы
    chengeMonth = document.getElementById('chengeMonth').checked;
    addListItem = document.getElementById('addListItem').checked;
    deliteListItem = document.getElementById('deliteListItem').checked;
    selectedMonth = document.getElementById('selectedMonth').value;
    customYear = document.getElementById('customYear').value;
    //записываем значения в объект setings
    setings.chengeMonth = chengeMonth;
    setings.addListItem = addListItem;
    setings.deliteListItem = deliteListItem;
    if (selectedMonth !== undefined || selectedMonth !== 0) {
      setings.selectedMonth = +selectedMonth;
    }
    if (customYear !== undefined || customYear !== 0) {
      setings.customYear = +customYear;
    }

    var codeText = 	'<!--Подключение стилей--><link rel="stylesheet" type="text/css" href="https://rawgit.com/DmitryBelonogy/calendar/master/css/style.css"><!--Подключение скрипта--><div id="content"></div><script>var setings = ' + JSON.stringify(setings, null, ' ') + ';</script><script src="https://rawgit.com/DmitryBelonogy/calendar/master/js/calendar.js"></script>';
    
    //выводим setings на экран
      code.innerText = codeText;

    drawPreview(setings);

  })

  function drawPreview(setings) {

    var date = new Date();

    var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    if (setings.selectedMonth === undefined || setings.selectedMonth === 0) {
      var checkMonth = month[date.getMonth()];
      delete setings.selectedMonth;
    } else {
      var checkMonth = month[setings.selectedMonth];
    }

    if (setings.customYear === undefined || setings.customYear === 0) {
      var customYear = date.getFullYear();
      delete setings.customYear;
    } else {
      var customYear = setings.customYear;
    }

    if (setings.chengeMonth === true) {
      var prevArrow = '‹';
      var nexArrow = '›';
    } else {
      var prevArrow = '';
      var nexArrow = '';
    }

    var previewCode = '<table id="previewCalendar"><thead><tr><td id="preview_prev_month">' + prevArrow + '</td><td colspan="5" id="month" data-month="9" data-year="2017">' + checkMonth + ' ' + customYear + '</td><td id="preview_next_month">' + nexArrow + '</td></tr><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr></thead><tbody>';

    for (let i = 0; i<= 5; i++) {
      previewCode += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
    }

    previewCode += '</tbody></table>';

    preview.innerHTML = previewCode;

  }

  drawPreview(setings);

}

