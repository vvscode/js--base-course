let lStorage = {
  setData: (key, value) =>
    new Promise((resolve, reject) => {
      window.localStorage.setItem(key, value);
      resolve([key, value]);
    }),
  getData: (key) =>
    new Promise((resolve, reject) => {
      let value = window.localStorage.getItem(key);
      if (value) resolve(value);
    }),
};

let askUser = {
  setNote: (dayElem) =>
    new Promise(function(resolve, reject) {
      let value = prompt('Please enter note text');
      if (value) {
        resolve(value);
      }
    }),
};

let Calendar = (function(storage, askUser) {
  /**
   * Конструктор календаря
   * @param {object} options объект настроек
   */
  function Calendar(options) {
    this.options = Object.assign(
      { allowChangeMonth: true, className: 'calendar' },
      options
    );
    this.options.date = options.date || [2017, 11];
    drawInteractiveCalendar(this.options);
    console.log(this.options);
  }
  /**
   * Функция сборки календаря
   * @param {object} options объект настроек
   */
  function drawInteractiveCalendar(options) {
    let el = document.getElementById(options.el.slice(1));
    let date = new Date(options.date);
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    let monthsTable = document.createElement('div');
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let caption = document.createElement('text');
    caption.innerText =
      thisYear + ' / ' + date.toLocaleString('en', { month: 'long' });

    let prevMnthBtn = document.createElement('button');
    prevMnthBtn.innerText = '[ < ]';
    prevMnthBtn.id = 'prev';

    let nextMnthBtn = document.createElement('button');
    nextMnthBtn.innerText = '[ > ]';
    nextMnthBtn.id = 'next';

    options.allowChangeMonth && el.appendChild(prevMnthBtn);
    options.showMonth && el.appendChild(caption);
    options.allowChangeMonth && el.appendChild(nextMnthBtn);
    if (options.allowChangeMonth) {
      switchToNextMonth();
      switchToPrevMonth();
    }
    el.appendChild(monthsTable);
    drawCalendar(thisYear, thisMonth, monthsTable);
    doubleClickListener(el, options);
    options.allowAdd && drawNoteToCalendar(el, thisYear, thisMonth, options);
    el.className = options.className;
    /**
     * Создание заголовка
     * @param {number} year
     * @param {number} month
     */
    function createCaption(year, month) {
      caption.innerText = year + '/' + months[month];
    }
    /**
     * Переключение календаря на предыдущий месяц
     */
    function switchToPrevMonth() {
      prevMnthBtn.addEventListener('click', function() {
        --thisMonth;
        if (thisMonth < 0) {
          thisMonth = 11;
          thisYear -= 1;
        }
        createCaption(thisYear, thisMonth);
        drawCalendar(thisYear, thisMonth, monthsTable);
        options.allowAdd &&
          drawNoteToCalendar(el, thisYear, thisMonth, options);
      });
    }
    /**
     * Переключение на следующий месяц
     */
    function switchToNextMonth() {
      nextMnthBtn.addEventListener('click', function() {
        ++thisMonth;
        if (thisMonth > 11) {
          thisMonth = 0;
          thisYear += 1;
        }
        createCaption(thisYear, thisMonth);
        drawCalendar(thisYear, thisMonth, monthsTable);
        options.allowAdd &&
          drawNoteToCalendar(el, thisYear, thisMonth, options);
      });
    }

    /**
     * Слушатель двойного клика для добавления заметки
     */
    function doubleClickListener() {
      el.addEventListener('dblclick', function() {
        if (event.target.className === 'day' && options.allowAdd === true) {
          addNote(event.target, el, thisMonth, thisYear, options);
        }
      });
    }
    /**
     * Запись заметок в календарь
     */
    function drawNoteToCalendar() {
      let days = el.getElementsByClassName('day');
      for (let i = 0; i < days.length; i++) {
        let key =
          options.el +
          '.' +
          days[i].innerHTML.split(' ')[0] +
          '.' +
          thisMonth +
          '.' +
          thisYear;
        storage.getData(key).then((result) => {
          if (options.allowRemove == false) {
            drawNote(days[i], result, options);
          } else {
            drawNote(days[i], result, options);
            days[i].onclick = btnDeleteClickHandler.bind(days[i], key);
          }
        });
      }
    }
    /**
     * Ввод пользователем заметки и добавление её в календарь
     * @param {object} target целевой элемент календаря для отрисовки в нём заметки
     */
    function addNote(target) {
      let thisElement = target;
      let thisDay = target.innerHTML.split(' ')[0];
      let key = options.el + '.' + thisDay + '.' + thisMonth + '.' + thisYear;
      askUser.setNote(thisElement).then((result) => {
        storage.setData(key, result).then((result) => {
          drawNote(thisElement, result[1], options);
          thisElement.onclick = btnDeleteClickHandler.bind(
            thisElement,
            result[0]
          );
        });
      });
    }
    /**
     * Запись заметки в ячейку календаря
     * @param {element} dayElement целевой элемент
     * @param {string} result пользовательская заметка
     */
    function drawNote(dayElement, result) {
      let note =
        dayElement.innerHTML.split(' ')[0] +
        ' <div class="divNote"><label class="lblNote">' +
        result +
        '</label>';
      if (options.allowRemove) {
        note += '<button class="btnDelete">x</button ></div >';
      }

      dayElement.innerHTML = note;
    }
    /**
     * Обработка события удаления заметки
     * @param {*} key Ключ в storage
     */
    function btnDeleteClickHandler(key) {
      if (event.target.className == 'btnDelete') {
        storage.setData(key, '').then(() => {
          this.removeChild(this.querySelector('div'));
        });
      }
    }
  }

  /**
   * Функция отрисовки таблицы с днями недели
   * @param {number} year
   * @param {number} month
   * @param {*} htmlEl
   */
  function drawCalendar(year, month, htmlEl) {
    let monthStart = new Date(year, month);
    let monthEnd = new Date(year, month, 0);
    let sunday = 7;
    let table =
      '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
    let calendar = document.createElement('div');
    calendar.setAttribute('id', 'table');
    /**
     *
     * @param {*} dayNumber
     * @return {*} последний день недели
     */
    function fixWeekStart(dayNumber) {
      if (dayNumber === 0) {
        dayNumber = sunday;
      }
      return dayNumber;
    }

    for (let i = 1; i < fixWeekStart(monthStart.getDay()); i++) {
      table += '<td></td>';
    }

    for (let i = 1; i <= monthEnd.getDate(); i++) {
      table += '<td class="day">' + i + ' </td>';
      if (fixWeekStart(monthStart.getDay()) == sunday) {
        table += '</tr><tr>';
      }
      monthStart.setDate(monthStart.getDate() + 1);
    }

    table += '</tr></table>';

    htmlEl.innerHTML = table;
  }

  return Calendar;
})(lStorage, askUser);
