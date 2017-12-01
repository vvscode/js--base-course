document.addEventListener (`DOMContentLoaded`, refreshHash);

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
  let table = document.createElement(`table`); // create table
  table.className = `calendar`;
  table.id = `Cal_${this.number}`;
  table.creator = this;
  table.innerHTML = `<thead></thead><tbody><tr></tr></tbody>`; // with head and body

  let thead = table.querySelector(`thead`);
  let tr1 = document.createElement(`tr`);
  let monthName = new Date(this.year, this.month - 1).toLocaleString(`ru`, {
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
      th.innerText = `${monthName}/${this.year}`;
    }
    if (i === 2) {
      th.innerHTML = '&#8658';
      th.classList.add(`next`);
    }
    tr1.appendChild(th);
  }
  thead.appendChild(tr1);

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

  let tbody = table.querySelector(`tbody`).lastElementChild;
  let count = 0;

  let date = new Date(this.year, this.month - 1, 1);
  let limit = date.getDay() > 0 ? date.getDay() : 7;
  for (let i = 1; i < limit; i++) { // insert empty cells until first day of month
    let td = document.createElement(`td`);
    tbody.appendChild(td);
    count++;
  }

  for (let i = 1; i < 32; i++) { // write days of month
    let date = new Date(this.year, this.month - 1, i);
    if (date.getMonth() === this.month - 1) {
      let td = document.createElement(`td`);
      td.innerText = date.getDate();
      td.date = new Date(this.year, this.month - 1, td.innerText).toLocaleString(`en`, {
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

  if (tbody.querySelectorAll(`td`).length < 7) { // insert empty cells until the string end
    for (let i = tbody.querySelectorAll(`td`).length; i < 7; i++) {
      let td = document.createElement(`td`);
      tbody.appendChild(td);
    }
  }
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

Calendar.prototype.saveChangeToLoacalHash = function () {
  window.location.hash = ``;
  let str = `YM`;
  let allTable = document.body.querySelectorAll(`.calendar`);
  allTable.forEach(function (elem, i) {
    if (i === allTable.length - 1) {
      str += JSON.stringify(elem.creator, [`year`, `month`]);
      return;
    }
    str += JSON.stringify(elem.creator, [`year`, `month`]);
    str += `&`;
  });
  str += `COMMENTS`;
  allTable.forEach(function (elem, i) {
    if (i === allTable.length - 1) {
      str += JSON.stringify(elem.creator.comment);
      return;
    }
    str += JSON.stringify(elem.creator.comment);
    str += `&`;
  });
  window.location.hash = str;
};

Calendar.prototype.addComment = function (key, value) {
  this.comment[key] = value;
};

document.body.addEventListener(`click`, function (e) {
  if (e.target !== document.querySelectorAll(`.data`)[1]) {
    if (document.querySelectorAll(`.data`)[1]) {
      let comment = document.querySelectorAll(`.data`)[1];
      if (comment.value !== ``) {
        comment.creator.addComment(comment.saveDate, comment.value);
        comment.creator.refreshComment();
      }
    }
    while (document.querySelector(`.data`)) {
      let elem = document.querySelector(`.data`);
      elem.parentNode.removeChild(elem);
    }
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
      let day = new Date(obj.year, obj.month - 1, e.target.closest('TD').innerText).toLocaleString(`ru`, {
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
  new Calendar (htmlEl, year, month+1);
}

function drawInteractiveCalendar (el) {
  new Calendar (el);
}

function refreshHash () {
  let str = window.location.hash;
  if (str.indexOf(`YM`) > 0 && str.indexOf(`COMMENTS`) > 0) {
    let index = str.indexOf(`COMMENT`);
    let ym = str.slice(3, index).split(`&`);
    let comment = str.slice(index + 8).split(`&`);
    for (let i = 0; i < ym.length; i++) {
      let oldObj = JSON.parse(ym[i]);
      let oldComment = JSON.parse(comment[i]);
      let newObj = document.querySelectorAll(`.calendar`)[i].creator;
      newObj.comment = oldComment;
      for (let key in oldObj) {
        newObj[key] = oldObj[key];
      }
      newObj.refreshCalendar();
      newObj.refreshComment();
    }
  }
}

drawInteractiveCalendar(document.body);
drawCalendar(2000, 1, document.body);
