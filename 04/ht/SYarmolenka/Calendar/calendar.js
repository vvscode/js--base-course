document.addEventListener (`DOMContentLoaded`, readHash); // обработать при загрузке

function readHash() { // чтение local/session и обновление свойств объекта календарь
  Promise.resolve()
    .then(function () {
      return window.sessionStorage.getItem(`calendar`);
    })
    .then(function (str) {
      let allCalendar = document.querySelectorAll(`.calendar`);
      allCalendar.forEach(function(table) {
        for (let key in window.sessionStorage) {
          if (`Cl${table.creator.number}` === key) {
            let obj = JSON.parse(window.sessionStorage[key]);
            for (let key in obj) {
              if (key === `html`) {
                table.creator.calendar.querySelector(`tbody`).innerHTML = obj[key];
                continue;
              }
              table.creator[key] = obj[key];
            }
          }
        }
        table.creator.refreshCalendar();
      })
    });
};

function Calendar (setupObject) { // кнструктор
  Object.assign(this, setupObject);
  let date = setupObject.date.split(`,`);
  this.year = date[0];
  this.month = date[1];
  this.htmlEl = document.querySelector(setupObject.el);
  this.number = document.querySelectorAll(`.calendar`).length;
  this.calendar = this.creatCalendar();
  this.drawCalendar();
}

Calendar.prototype.creatCalendar = function () { //cоздает календарь
  let table = document.createElement(`table`);
  let self = this;
  table.className = `calendar ${this.addClass}`;
  table.id = `Cal${this.number}`;
  table.creator = this;
  table.innerHTML = `<thead></thead><tbody><tr></tr></tbody>`;
  let count = 0;

  function createHead(button) { // создает шапку календаря, если button===true - дорисовывает кнопки изменения месяца
    let thead = table.querySelector(`thead`);
    let tr = document.createElement(`tr`);
    let monthName = new Date(self.year, self.month - 1, 1, 4).toLocaleString(`ru`, {
      month: 'long'
    }).toUpperCase();
    if (!button) {
      let th = document.createElement(`th`);
      th.setAttribute(`colspan`, `7`, 0);
      th.innerText = `${monthName}/${self.year}`;
      tr.appendChild(th);
    } else {
      for (let i = 0; i < 3; i++) {
        let th = document.createElement(`th`);
        if (i === 0) {
          th.innerHTML = '&#8656';
          th.classList.add(`back`);
        }
        if (i === 1) {
          th.setAttribute(`colspan`, `5`, 0);
          th.innerText = `${monthName}/${self.year}`;
        }
        if (i === 2) {
          th.innerHTML = '&#8658';
          th.classList.add(`next`);
        }
        tr.appendChild(th);
      }
    }
    thead.insertBefore(tr, thead.firstElementChild);
  }

  function createDaysName() { // создает имена дней недели
    let thead = table.querySelector(`thead`);
    let tr = document.createElement(`tr`);
    for (let i = 0; i < 7; i++) {
      let th = document.createElement(`th`);
      let date = new Date(2017, 10, 13 + i);
      let op = {
        weekday: 'short'
      };
      th.innerText = date.toLocaleString(`ru`, op).toUpperCase();
      tr.appendChild(th);
    }
    thead.appendChild(tr);
  }

  function addEmptyCells(where) { // создает пустые ячейки
    let tbody = table.querySelector(`tbody`).lastElementChild;
    if (where === `front`) { // спереди
      let date = new Date(self.year, self.month - 1, 1);
      let limit = date.getDay() > 0 ? date.getDay() : 7;
      for (let i = 1; i < limit; i++) {
        let td = document.createElement(`td`);
        tbody.appendChild(td);
        count++;
      }
    }
    if (where === `back`) { // и сзади
      if (tbody.querySelectorAll(`td`).length < 7) {
        for (let i = tbody.querySelectorAll(`td`).length; i < 7; i++) {
          let td = document.createElement(`td`);
          tbody.appendChild(td);
        }
      }
    }
  }

  function createCalendar() { // создает дни месяца
    let tbody = table.querySelector(`tbody`).lastElementChild;
    for (let i = 1; i < 32; i++) { // write days of month
      let date = new Date(self.year, self.month - 1, i);
      if (date.getMonth() === self.month - 1) {
        let td = document.createElement(`td`);
        let span = document.createElement(`span`);
        td.appendChild(span);
        span.innerText = date.getDate();
        td.date = new Date(self.year, self.month - 1, td.innerText,4).toLocaleString(`en`, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });
        if (count === 7) {
          count = 0;
          let tr = document.createElement(`tr`);
          table.querySelector(`tbody`).appendChild(tr);
          tbody = table.querySelector(`tbody`).lastElementChild;
        }
        tbody.appendChild(td);
        count++;
      }
    }
  }

  createDaysName();
  addEmptyCells(`front`);
  createCalendar();
  addEmptyCells(`back`);
  if (self.showMonth) createHead(self.allowChangeMonth);
  return table;
};

Calendar.prototype.drawCalendar = function () { // нарисовать календарь
  this.htmlEl.appendChild(this.calendar);
};

Calendar.prototype.refreshCalendar = function() { // обновить календарь
  this.saveChangeToLoacalHash();
  this.nextSibling = this.calendar.nextElementSibling;
  this.htmlEl.removeChild(this.calendar);
  this.calendar = this.creatCalendar();
  this.htmlEl.insertBefore(this.calendar, this.nextSibling);
  if (this.comment && +this.year === +this.comment[0] && +this.month === +this.comment[1]) {
    this.calendar.querySelector(`tbody`).innerHTML = this.comment[2];
  }
  if (this.allowRemove) {
    this.hideBtnRemove(true);
  } else {
    this.hideBtnRemove(false);
  }
};

Calendar.prototype.saveChangeToLoacalHash = function() { // записать изменения в local/session
  let self = this;
  Promise.resolve(self).then(function(obj) {
    let json = JSON.stringify(obj, [`year`,
      `month`,
      `number`,
      `showMonth`,
      `allowChangeMonth`,
      `allowAdd`,
      `allowRemove`,
      `addClass`,
      `comment`
    ]);
    window.sessionStorage.setItem(`Cl${obj.number}`, json);
  });
};

Calendar.prototype.createTaskArea = function(element) { // создает окно для ввода задания
    let comment = document.createElement(`textarea`);
    let tbCoor = element.getBoundingClientRect();
    comment.classList.add(`comment`);
    comment.parentElem = element;
    document.body.appendChild(comment);
    comment.style.top = tbCoor.bottom - 1 + `px`;
    comment.style.left = tbCoor.left + `px`;
}

Calendar.prototype.addTask = function (area) { // записывает задание в ячейку календаря
  if (!area.div) {
    area.div = 1;
    let div = document.createElement(`div`);
    div.innerHTML = '<div class="del_task hide">&#215;</div><div class="task"></div>';
    area.parentElem.appendChild(div);
    let self = this;
    area.onkeyup = function() {
      div.lastElementChild.innerText = area.value;
      self.rememberTask();
    }
  }
}

Calendar.prototype.rememberTask = function () { // записывает задание в объект календаря
  let tbody = this.calendar.querySelector(`tbody`);
  this.comment = [this.year, this.month, tbody.innerHTML];
}

Calendar.prototype.hideArea = function (area) { // скрываеть окно для ввода задания
  if (area.parentElem.querySelectorAll(`.task`).length>0) {
    let task = area.parentElem.querySelectorAll(`.task`);
    task = task[task.length-1];
    if (task.innerText === ``) {
      task.parentNode.parentNode.removeChild(task.parentNode);
    }
  }
  area.parentNode.removeChild(area);
}

Calendar.prototype.hideBtnRemove = function (remove) { // скрывает кнопку удаления задания
  let divs = document.querySelectorAll(`.del_task`);
  if (remove) {
    divs.forEach(function (elem) {
      elem.classList.remove(`hide`);
    })
} else {
    divs.forEach(function (elem) {
      elem.classList.add(`hide`);
    })
  }
}

Calendar.prototype.deleteTask = function (task) { // удаляет задание из календаря
  task.parentNode.parentNode.removeChild(task.parentNode);
  this.rememberTask();
  this.saveChangeToLoacalHash();
}

document.body.addEventListener(`dblclick`, function(e) { // даблклик для записи задания
  if (e.target.closest('TD') && e.target.closest('TD').innerText !== `` && e.target.closest('table').creator.allowAdd) {
      e.target.closest('table').creator.createTaskArea(e.target.closest('TD'));
    }
});

document.body.addEventListener(`click`, function (e) { // фокус на окне ввода задания + запись и сохранение
  if (!e.target.classList.contains(`comment`)) return;
  e.target.parentElem.closest('table').creator.addTask(e.target);
});

document.body.addEventListener(`click`, function (e) { // скрыть окно ввода задания
  if (document.querySelector(`.comment`) && e.target !== document.querySelector(`.comment`)) {
    let comment = document.querySelector(`.comment`);
    let obj = comment.parentElem.closest(`table`).creator;
    obj.hideArea(comment);
    obj.refreshCalendar();
  }
});

document.body.addEventListener(`click`, function (e) { // изменить месяц календаря
  if (e.target.closest('TABLE')) {
    let table = e.target.closest('TABLE');
    let obj = table.creator;
    if (e.target.closest('TH') && e.target.className === `back`) {
      if (+obj.month - 1 < 1) {
        obj.year--;
        obj.month = 12;
      } else {
        obj.month--;
      }
      obj.refreshCalendar();
    }
    if (e.target.closest('TH') && e.target.className === `next`) {
      if (+obj.month + 1 > 12) {
        obj.year++;
        obj.month = 1;
      } else {
        obj.month++;
      }
      obj.refreshCalendar();
    }
  }
});

document.body.addEventListener(`click`, function (e) { // удаление задания
  if (e.target.classList.contains(`del_task`)) {
    let message = e.target.nextElementSibling.innerText;
    if (confirm(`Удалить задание: ${message}?`)) {
      let obj = e.target.closest(`table`).creator;
      obj.deleteTask(e.target);
    }
  }
});
