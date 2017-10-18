let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let $$ = text => document.querySelector(text);
let listEvent = $$(".listEvent");

(function init() {
  $$(".back").addEventListener("click", back);
  $$(".next").addEventListener("click", next);
  drawInteractiveCalendar(year, month);
  fetch("calendar").then(data => drawHistoryEvents(data));
})();

function drawHistoryEvents(arr) {
  arr.forEach(item => {
    listEvent.innerHTML += item;
  });
}

function drawInteractiveCalendar(year, month) {
  let d = new Date(year, month - 1);
  let mon = month - 1;
  let table =
    "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";
  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }
  while (d.getMonth() === mon) {
    table += `<td>${d.getDate()}</td>`;
    if (d.getDay() === 0) {
      table += "</tr><tr>";
    }
    d.setDate(d.getDate() + 1);
  }

  table += "</tr></table>";
  $$("#calendar").innerHTML = table;
  $$("#info").innerHTML = month + " / " + year;

  handlerEvent();
}
function getDay(d) {
  let day = d.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
}

function back() {
  --month;
  check();
}
function next() {
  ++month;
  check();
}
function check() {
  if (month === 13) {
    ++year;
    month = 1;
  } else if (month === 0) {
    --year;
    month = 12;
  }
  return drawInteractiveCalendar(year, month);
}

function handlerEvent() {
  let table = $$("table");
  table.addEventListener("click", ev => {
    let target = ev.target;
    if (target.tagName !== "TD") return;
    if (!target.innerHTML) return;

    let event = prompt("enter some event", "eat");
    let infoTarget = `<li>${target.innerHTML} - ${event}</li>`;
    let infoArr = [];
    infoArr.push(infoTarget);
    listEvent.innerHTML += infoTarget;
    fetch("calendar")
      .then(data => {
        data.push(infoTarget);
        return data;
      })
      .then(data => setItem("calendar", data))
      .catch(() => setItem("calendar", infoArr));
  });
}

function setItem(key, data) {
  return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
}

function fetch(key) {
  let data = JSON.parse(localStorage.getItem(key));
  if (data) return Promise.resolve(data);
  return Promise.reject();
}
