document.addEventListener (`DOMContentLoaded`, readHash);

function Calendar (htmlEl, year, month) {
  this.year = year || new Date().getFullYear();
  this.month = month || new Date().getMonth() + 1;
  this.htmlEl = htmlEl;
  this.comment = {};
  this.number = document.body.querySelectorAll(`.calendar`).length;
  this.calendar = this.creatCalendar();
  this.drawCalendar();
}

Calendar.prototype.creatCalendar = function () {
  let table = document.createElement(`table`);
  let self = this;
  table.className = `calendar`;
  table.id = `Cal_${this.number}`;
  table.creator = this;
  table.innerHTML = `<thead></thead><tbody><tr></tr></tbody>`; // with head and body
  let count = 0;

  function createHead() {
    let thead = table.querySelector(`thead`);
    let tr1 = document.createElement(`tr`);
    let monthName = new Date(self.year, self.month - 1, 1, 4).toLocaleString(`ru`, {
      month: 'long'
    }).toUpperCase();
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
      tr1.appendChild(th);
    }
    thead.appendChild(tr1);
  }

  function createDaysName() {
    let thead = table.querySelector(`thead`);
    let tr2 = document.createElement(`tr`);
    for (let i = 0; i < 7; i++) { // write in head days of week
      let th = document.createElement(`th`);
      let date = new Date(2017, 10, 13 + i);
      let op = {
        weekday: 'short'
      };
      th.innerText = date.toLocaleString(`ru`, op).toUpperCase();
      tr2.appendChild(th);
    }
    thead.appendChild(tr2);
  }

  function addEmptyCells(where) {
    let tbody = table.querySelector(`tbody`).lastElementChild;
    if (where === `front`) {
      let date = new Date(self.year, self.month - 1, 1);
      let limit = date.getDay() > 0 ? date.getDay() : 7;
      for (let i = 1; i < limit; i++) { // insert empty cells until first day of month
        let td = document.createElement(`td`);
        tbody.appendChild(td);
        count++;
      }
    }
    if (where === `back`) {
      if (tbody.querySelectorAll(`td`).length < 7) { // insert empty cells until the string end
        for (let i = tbody.querySelectorAll(`td`).length; i < 7; i++) {
          let td = document.createElement(`td`);
          tbody.appendChild(td);
        }
      }
    }
  }

  function createCalendar() {
    let tbody = table.querySelector(`tbody`).lastElementChild;
    for (let i = 1; i < 32; i++) { // write days of month
      let date = new Date(self.year, self.month - 1, i);
      if (date.getMonth() === self.month - 1) {
        let td = document.createElement(`td`);
        td.innerText = date.getDate();
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

  createHead();
  createDaysName();
  addEmptyCells(`front`);
  createCalendar();
  addEmptyCells(`back`);
  return table;
};

Calendar.prototype.drawCalendar = function () {
  this.htmlEl.appendChild(this.calendar);
};

Calendar.prototype.refreshCalendar = function () {
  this.nextSibling = this.calendar.nextElementSibling;
  this.htmlEl.removeChild(this.calendar);
  this.calendar = this.creatCalendar();
  this.htmlEl.insertBefore(this.calendar, this.nextSibling);
};

Calendar.prototype.refreshComment = function () {
  let allTD = this.calendar.querySelectorAll(`td`);
  for (let i = 0; i < allTD.length; i++) {
    for (let key in this.comment) {
      if (key === allTD[i].date) {
        allTD[i].style.background = `#FFFD78`;
        allTD[i].classList.add(`comment`);
      }
    }
  }
  this.saveChangeToLoacalHash();
};

Calendar.prototype.saveChangeToLoacalHash = function() {
    let hash = window.location.hash;
    let jsonObj = {};
    jsonObj.year = this.year;
    jsonObj.month = this.month;
    jsonObj.comment = this.comment;
    let str = `Cl${this.number}&${JSON.stringify(jsonObj)}END`;
    if (hash.indexOf(`Cl${this.number}`) >= 0) {
      if (hash.indexOf(str) >= 0) return;
      let first = hash.indexOf(`Cl${this.number}`);
      let last = hash.indexOf(`}END`, first)+4;
      window.location.hash = hash.slice(0, first)+str+hash.slice(last);
      return
    }
    window.location.hash += str;
};

Calendar.prototype.addComment = function (key, value) {
  this.comment[key] = value;
};

function saveComment() {
  if (document.querySelectorAll(`.data`)[1]) {
    let comment = document.querySelectorAll(`.data`)[1];
    if (comment.value !== ``) {
      comment.creator.addComment(comment.saveDate, comment.value);
      comment.creator.refreshComment();
    }
  }
}
function hideComment() {
  while (document.querySelector(`.data`)) {
    let elem = document.querySelector(`.data`);
    elem.oninput = null;
    elem.parentNode.removeChild(elem);
  }
}

document.body.addEventListener(`click`, function (e) {
  if (e.target !== document.querySelectorAll(`.data`)[1] && document.querySelector(`.data`)) {
    saveComment();
    hideComment();
  }
});

document.body.addEventListener(`click`, function (e) {
  if (!e.target.closest(`textarea,.data`)) return;
   e.target.oninput = function(){
     saveComment();
   }
});

document.body.addEventListener(`click`, function (e) {
  if (e.target.closest('TABLE')) {
    let table = e.target.closest('TABLE');
    let obj = table.creator;
    if (e.target.closest('TH') && e.target.className === `back`) {
      if (obj.month === 1) {
        obj.year--;
        obj.month = 12;
      } else {
        obj.month--;
      }
    }
    if (e.target.closest('TH') && e.target.className === `next`) {
      if (obj.month === 12) {
        obj.year++;
        obj.month = 1;
      } else {
        obj.month++;
      }
    }

    if (e.target.closest('TD') && e.target.closest('TD').innerText !== ``) {
      let day = new Date(obj.year, obj.month - 1, e.target.closest('TD').innerText, 4).toLocaleString(`ru`, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      let div = document.createElement(`div`);
      let comment = document.createElement(`textarea`);
      div.classList.add(`data`);
      comment.style.width = obj.calendar.getBoundingClientRect().width - 6 + `px`;
      comment.classList.add(`data`);
      comment.creator = obj;
      comment.saveDate = e.target.closest('TD').date;
      if (e.target.closest('TD').classList.contains(`comment`)) {
        for (let key in obj.comment) {
          if (key === e.target.closest('TD').date) {
            comment.value = obj.comment[key];
            e.target.closest('TD').classList.remove(`comment`);
            e.target.closest('TD').style.background = ``;
            delete obj.comment[key];
          }
        }
      }
      div.innerText = day;
      obj.htmlEl.insertBefore(comment, table.nextElementSibling);
      obj.htmlEl.insertBefore(div, table.nextElementSibling);
    }
    obj.refreshCalendar();
    obj.refreshComment();
  }
});

function drawCalendar (year, month, htmlEl) {
  new Calendar (htmlEl, year, month);
}

function drawInteractiveCalendar (el) {
  new Calendar (el);
}

function readHash() {
  let str = window.location.hash;
  let allCalendarOnPage = document.querySelectorAll(`.calendar`);
  if (str.indexOf(`Cl`) >= 0 && str.indexOf(`}END`) > 0) {
    let stringOfObj = str.split(`ENDCl`);;
    stringOfObj.forEach(function(elem, i, arr) {
      if (i === 0) elem = elem.slice(3);
      if (i === arr.length - 1) elem = elem.slice(0, -3);
      arr[i] = elem;
    })
    stringOfObj.forEach(function(elem, i, arr) {
      arr[i] = elem.split(`&`);
    })
    allCalendarOnPage.forEach(function(table) {
      stringOfObj.forEach(function(elem) {
        if (+elem[0] === table.creator.number) {
          let obj = JSON.parse(elem[1]);
          for (let key in obj) {
            table.creator[key] = obj[key];
          }
        }
      })
      table.creator.refreshCalendar();
      table.creator.refreshComment();
    })
  }
};

drawInteractiveCalendar(document.body);
drawCalendar(2000, 1, document.body);
