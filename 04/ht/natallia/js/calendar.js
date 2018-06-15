var date = new Date(),
  currentMonth = date.getMonth() + 1,
  currentYear = date.getFullYear(),
  allowAddTasks,
  allowRemoveTasks;

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
          result +=
            '<td class="calendar__cell"><span data-el="' +
            htmlEl.id +
            '" data-day="' +
            el +
            '" data-month="' +
            month +
            '" data-year="' +
            year +
            '">' +
            el +
            '</span></td>';
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
    '<button data-btn="prev" class="btn calendar-header__btn  calendar-header__btn--prev"><img src="./img/prev.png" alt="previous"></button><span class="calendar-header__span">' +
    writeMonth +
    ' ' +
    writeYear +
    '</span><button data-btn="next" class="btn calendar-header__btn calendar-header__btn--next"><img src="./img/next.png" alt="next"></button>';
}

function getPrevMonth(htmlEl, month, year, htmlElHeader, value) {
  var prev = htmlElHeader.querySelector('button[data-btn="prev"]');
  prev.addEventListener('click', function() {
    --month;
    if (month < 1) {
      month = 12;
      year -= 1;
    }

    value.month = month;
    value.year = year;
    date = new Date(year, month);
    drawInteractiveCalendar(value);
    getStorageValue(value);
    return date;
  });
}

function getNextMonth(htmlEl, month, year, htmlElHeader, value) {
  var next = htmlElHeader.querySelector('button[data-btn="next"]');
  next.addEventListener('click', function() {
    ++month;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    value.month = month;
    value.year = year;

    date = new Date(year, month);
    drawInteractiveCalendar(value);
    getStorageValue(value);
    return date;
  });
}

function createCalendarHeader(htmlEl) {
  var calendarHeader = document.createElement('div');
  calendarHeader.id = htmlEl.id + '-header';
  calendarHeader.classList = 'calendar-header';
  htmlEl.parentNode.insertBefore(calendarHeader, htmlEl);
}

function drawInteractiveCalendar(value) {
  var htmlEl = document.getElementById(value.el) || value.el,
    year = value.year,
    month = value.month,
    database = value.database,
    changeMonth = value.changeMonth,
    displayData = value.displayData;

  if (!year) {
    year = currentYear;
  }

  if (!month) {
    month = currentMonth;
  }

  var id = htmlEl.id + '-header';
  if (
    (!document.getElementById(htmlEl.id + '-header') && changeMonth) ||
    (!document.getElementById(htmlEl.id + '-header') && displayData)
  ) {
    createCalendarHeader(htmlEl);
  }

  var htmlElHeader = document.getElementById(htmlEl.id + '-header');
  drawCalendar(year, month, htmlEl);

  if (displayData && !changeMonth) {
    writeMonthAndYear(year, month, htmlElHeader);
    var btn = htmlEl.parentNode.querySelectorAll('button');
    btn.forEach(function(el) {
      el.style.display = 'none';
    });
  } else if (changeMonth) {
    writeMonthAndYear(year, month, htmlElHeader);
    getPrevMonth(htmlEl, month, year, htmlElHeader, value);
    getNextMonth(htmlEl, month, year, htmlElHeader, value);
  } else {
    if (htmlElHeader) {
      htmlElHeader.remove();
    }
  }
  addEvent(value);
}

function addEvent(value) {
  var htmlEl = document.getElementById(value.el) || value.el,
    allowAddTasks = value.allowAdd,
    allowRemoveTasks = value.allowRemove,
    database = value.database,
    targetData,
    targetTd;

  htmlEl.addEventListener(
    'click',
    function(e) {
      e.preventDefault();
      if (allowAddTasks) {
        var target = e.target;

        if (
          (target.tagName === 'TD' && target.innerHTML !== '') ||
          target.tagName === 'SPAN'
        ) {
          if (target.tagName === 'TD') {
            targetTd = target;
            targetData = target.querySelector('span');
          } else {
            targetData = target;
            targetTd = targetData.parentNode;
          }
          askQuestion(htmlEl);
        }

        /** add task*/
        if (target === htmlEl.querySelector('#addTask')) {
          var targetDay = targetData.getAttribute('data-day'),
            targetMonth = targetData.getAttribute('data-month'),
            targetYear = targetData.getAttribute('data-year'),
            targetEl = targetData.getAttribute('data-el'),
            inputValue = htmlEl.querySelector('#task-input').value,
            i,
            keyName;

          if (!inputValue) {
            inputValue = 'Решать задачки';
          }

          if (!targetTd.querySelector('div')) {
            var wrap = document.createElement('div');
            wrap.className = 'user-tasks-wrap';
            targetTd.appendChild(wrap);
            i = 1;
          } else {
            var len = targetData.parentNode.querySelectorAll('[data-num]')
              .length;
            i = len + 1;
          }
          var userTask = document.createElement('div');
          userTask.className = 'user-task';
          userTask.setAttribute('data-num', i);
          userTask.setAttribute('data-day', targetDay);
          userTask.setAttribute('data-month', targetMonth);
          userTask.setAttribute('data-year', targetYear);
          userTask.setAttribute('data-el', targetEl);
          keyName =
            'id' +
            targetEl +
            ' event' +
            i +
            ' for day' +
            targetDay +
            ' month' +
            targetMonth +
            ' year' +
            targetYear;

          if (database === 'localStorage') {
            function setStorage() {
              return new Promise(function(resolve) {
                setTimeout(function() {
                  if (database === 'localStorage') {
                    localStorage.setItem(keyName, inputValue);
                    if (localStorage.getItem(keyName)) {
                      resolve();
                    }
                  }
                }, 10);
              });
            }

            setStorage().then(function() {
              userTask.innerHTML =
                '<p class="user-task__p">' + inputValue + '</p>';
              targetTd.querySelector('.user-tasks-wrap').appendChild(userTask);

              if (allowRemoveTasks) {
                userTask.innerHTML +=
                  '<button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
              }
            });
          } else if (database === 'firebase') {
            var uid = htmlEl.parentNode
              .querySelector('.btn-auth-page__p')
              .getAttribute('data-name');
            var folder = '/tasks/';
            var obj = {
              [keyName]: inputValue
            };

            var path = uid + '/' + keyName;

            var method = 'PUT';

            setData(method, folder, path, obj)
              .then(function(response) {
                return response.json();
              })
              .then(tasks => {
                getData(folder, path)
                  .then(function(response) {
                    return response.json();
                  })
                  .then(function(database) {
                    for (var key in database) {
                      userTask.innerHTML =
                        '<p class="user-task__p">' + database[key] + '</p>';
                      targetTd
                        .querySelector('.user-tasks-wrap')
                        .appendChild(userTask);

                      if (allowRemoveTasks) {
                        userTask.innerHTML +=
                          '<button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
                      }
                    }
                  });
              });
          }

          document.querySelector('#task').remove();
        }
      }

      /**cancel task*/
      if (target === htmlEl.querySelector('#cancelTask')) {
        htmlEl.querySelector('#task').remove();
      }

      /** delete task*/
      if (
        target &&
        target.parentNode.hasAttribute('data-close') &&
        allowRemoveTasks
      ) {
        if (
          !htmlEl.querySelector('#confirm') &&
          target.parentNode.hasAttribute('data-close')
        ) {
          var btnClose = target.parentNode,
            confirm = document.createElement('div');

          userTask = btnClose.parentNode;

          confirm.id = 'confirm';
          confirm.classList = 'task';
          confirm.setAttribute('data-el', userTask.getAttribute('data-el'));
          confirm.setAttribute('data-num', userTask.getAttribute('data-num'));
          confirm.setAttribute('data-day', userTask.getAttribute('data-day'));
          confirm.setAttribute(
            'data-month',
            userTask.getAttribute('data-month')
          );
          confirm.setAttribute('data-year', userTask.getAttribute('data-year'));
          confirm.innerHTML =
            '<p class="task__p">Точно удалить задание?</p><p class="task__p">Может все-таки задачки порешаем?</p><button id="deleteTask" class="task__btn btn">Удалить</button><button id="cancelRemove" class="task__btn btn">Отмена</button>';
          htmlEl.appendChild(confirm);
        }
      }

      if (target === htmlEl.querySelector('#deleteTask')) {
        var parentDiv = target.parentNode;
        keyName =
          'id' +
          parentDiv.getAttribute('data-el') +
          ' event' +
          parentDiv.getAttribute('data-num') +
          ' for day' +
          parentDiv.getAttribute('data-day') +
          ' month' +
          parentDiv.getAttribute('data-month') +
          ' year' +
          parentDiv.getAttribute('data-year');

        if (database === 'localStorage') {
          function delTask() {
            return new Promise(function(resolve) {
              setTimeout(function() {
                localStorage.removeItem(keyName);

                if (!localStorage.getItem(keyName)) {
                  resolve();
                }
              }, 10);
            });
          }

          delTask().then(function() {
            delEl(htmlEl, parentDiv);
          });
        } else if (database === 'firebase') {
          var folder = '/tasks/';
          let uid = htmlEl.parentNode
            .querySelector('.btn-auth-page__p')
            .getAttribute('data-name');
          path = uid + '/' + keyName;
          var methodDel = 'DELETE';

          delData(methodDel, folder, path).then(function() {
            delEl(htmlEl, parentDiv);
          });
        }
        parentDiv.remove();
      }

      if (target === htmlEl.querySelector('#cancelRemove')) {
        htmlEl.querySelector('#confirm').remove();
      }
    }
  );
}

/**create modal box*/
function askQuestion(htmlEl) {
  if (!htmlEl.querySelector('#task')) {
    var task = document.createElement('div');

    task.id = 'task';
    task.classList = 'task';
    task.innerHTML =
      '<label><p class="task__p">Что собираетесь делать?</p><input id="task-input" class="task__input" type="text" placeholder="Решать задачки" autofocus></label><button id="addTask" class="task__btn btn">Готово</button><button id="cancelTask" class="task__btn btn">Отмена</button>';
    htmlEl.appendChild(task);
  }
}

function delEl(htmlEl, contTask) {
  var el = htmlEl.querySelector(
    'div[data-el="' +
      contTask.getAttribute('data-el') +
      '"][data-num="' +
      contTask.getAttribute('data-num') +
      '"][data-month="' +
      contTask.getAttribute('data-month') +
      '"][data-day="' +
      contTask.getAttribute('data-day') +
      '"][data-year="' +
      contTask.getAttribute('data-year') +
      '"]'
  );
  var parentEl = el.parentNode;

  el.remove();

  if (parentEl.innerHTML === '') {
    parentEl.remove();
  }
}
