function settingsCalendar() {
  var form = document.querySelector('#settingsCalendar'),
    previewCalendar = document.querySelector('#previewCalendar'),
    createCalendar = document.querySelector('#createCalendar'),
    wrapRadio = document.querySelector('#wrap-radio'),
    selectMonthValue = null,
    selectYearValue = null,
    value = {
      el: 'calendar' + Math.random().toFixed(4) * 10000,
      changeMonth: false,
      allowAdd: true,
      allowRemove: true,
      displayData: false,
      year: null,
      month: null,
      database: 'localStorage'
    };

  form.addEventListener('change', function(e) {
    e.preventDefault();
    previewCalendar.innerHTML = '';
    var target = e.target,
      parentNode = e.target.parentNode,
      selectMonth = parentNode.querySelector('select[name="month"]'),
      selectYear = parentNode.querySelector('select[name="year"]');

    if (parentNode.tagName === 'LABEL') {
      if (form.querySelector('input[value="changeMonth"]').checked) {
        value.changeMonth = true;
      } else {
        value.changeMonth = false;
      }

      if (form.querySelector('input[value="addTasks"]').checked) {
        value.allowAdd = true;
        if (wrapRadio.classList.contains('disabled')) {
          wrapRadio.classList.remove('disabled');
        }
      } else {
        value.allowAdd = false;
        wrapRadio.classList.add('disabled');
      }

      if (form.querySelector('input[value="removeTasks"]').checked) {
        value.allowRemove = true;
      } else {
        value.allowRemove = false;
      }

      if (
        form.querySelector('input[type="radio"]:checked') &&
        !wrapRadio.classList.contains('disabled')
      ) {
        value.database = form.querySelector(
          'input[type="radio"]:checked'
        ).value;
      }

      if (form.querySelector('input[value="displayData"]').checked) {
        value.displayData = true;
      } else {
        value.displayData = false;
      }
    }

    if (target.tagName === 'SELECT') {
      var options = target.querySelectorAll('option');

      options.forEach(function(el) {
        el.removeAttribute('selected');
      });

      if (target === selectMonth) {
        selectMonthValue = selectMonth.value;
      } else if (target === selectYear) {
        selectYearValue = selectYear.value;
      }
    }

    var drawMonth = selectMonthValue;
    if (!drawMonth) {
      drawMonth = 'месяц не выбран';
    } else {
      value.month = drawMonth;
    }

    var drawYear = selectYearValue;
    if (!drawYear) {
      drawYear = 'год не выбран';
    } else {
      value.year = drawYear;
    }
    document.querySelector('#settingsResult').innerHTML =
      'Месяц: ' + drawMonth + ', год: ' + drawYear;

    value.el = 'calendar' + Math.random().toFixed(4) * 10000;

    setScript(value);
    drawPrevCalendar(value);
    getStorageValue(value);
  });

  setScript(value);
  drawPrevCalendar(value);
  getStorageValue(value);

  function drawPrevCalendar(value) {
    previewCalendar.innerHTML = '<div id="' + value.el + '">';
    drawInteractiveCalendar(value);
    document.getElementById(value.el).firstElementChild.className =
      'calendar__table calendar__table--big';
  }

  function setScript(value) {
    document.querySelector('#output').innerText =
      '<link rel="stylesheet" href="https://github.com/NatalliaK/calendar/blob/master/style/header.css">\n' +
      '<link rel="stylesheet" href="https://github.com/NatalliaK/calendar/blob/master/style/total.css">\n' +
      '<link rel="stylesheet" href="https://github.com/NatalliaK/calendar/blob/master/style/btn-auth-page.css">\n' +
      '<link rel="preload" href="https://github.com/NatalliaK/calendar/blob/master/style/auth.css"\n' +
      '\t\t\t\tas="style" onload="rel=\'stylesheet\'">\n' +
      '<link rel="preload" href="https://github.com/NatalliaK/calendar/blob/master/style/btn-close.css"\n' +
      '\t\t\t\tas="style" onload="rel=\'stylesheet\'">\n' +
      '<link rel="stylesheet" href="https://github.com/NatalliaK/calendar/blob/master/style/calendar.css">\n' +
      '<link rel="stylesheet" href="https://github.com/NatalliaK/calendar/blob/master/style/task.css">\n' +
      '\n' +
      '//"<link>" for tag "<header>"\n' +
      '\n' +
      '\n' +
      '<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js"></script>\n' +
      '<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-auth.js"></script>\n' +
      '<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-database.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/drawBtnForm.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/drawAuthForm.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/firebaseInit.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/database.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/calendar.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/firebase.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/storage.js"></script>\n' +
      '<script >\n' +
      '(function(){\n' +
      'var id = "' +
      value.el +
      '";\n' +
      'var value = {\n' +
      '\t\t\t    el: ' +
      value.el +
      ',\n' +
      '\t\t\t    changeMonth: ' +
      value.changeMonth +
      ',\n' +
      '\t\t\t    allowAdd: ' +
      value.allowAdd +
      ',\n' +
      '\t\t\t    allowRemove: ' +
      value.allowRemove +
      ',\n' +
      '\t\t\t    displayData: ' +
      value.displayData +
      ',\n' +
      '\t\t\t    month: ' +
      value.month +
      ',\n' +
      '\t\t\t		 year: ' +
      value.year +
      ',\n' +
      '\t\t\t   database: ' +
      value.database +
      '\n' +
      '\t\t\t  };\n' +
      ' document.write("<div id=" + id + "></div>");\n' +
      '\t\t\t  new drawInteractiveCalendar(value);\n' +
      'getStorageValue(value);\n' +
      '})();\n' +
      '</script>';
  }
}
