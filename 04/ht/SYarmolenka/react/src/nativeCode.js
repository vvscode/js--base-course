function drawCalendar(year, month, htmlEl) {
  if (htmlEl.querySelector(`.Calendar`)) {htmlEl.removeChild(htmlEl.querySelector(`.Calendar`))};
  const weekdays = new Array(7).fill(1).map((e, i) => (`<th>${new Date(2018, 2, 12 + i).toLocaleString('en', {weekday: 'short'}).toUpperCase()}</th>`));
  let firstDay = new Date(year, month - 1).getDay() - 1;
  firstDay = firstDay < 0 ? 6 : firstDay;
  const emptyBefore = new Array(firstDay).fill(`<td></td>`);
  const insertDays = new Array(31).fill(1).map((e, i) => {
    if (new Date(year, month - 1, i + 1).getMonth() === month - 1) return `<td class='pointer'>${i + 1}</td>`;
  }).filter(elem => elem);
  let calendar = [...emptyBefore, ...insertDays];
  while (calendar.length < Math.ceil(calendar.length / 7) * 7) {calendar.push(`<td></td>`)};
  calendar = calendar.map((e, i, arr) => {
    if (i === 0 || i % 7 === 0) return `<tr>${e}`;
    if (i % 7 === 0 || i === arr.length - 1) return `${e}</tr>`;
    return e;
  });
  const table = document.createElement('table');
  table.className = `Calendar`;
  table.innerHTML = `<thead><tr>${weekdays.join(``)}</tr></thead><tbody>${calendar.join(``)}</tbody>`;
  htmlEl.appendChild(table);
};

class Calendar {
  constructor (config) {
    this.config = config;
    this.number = document.body.querySelectorAll('.Calendar').length || 0;
    this.elem = document.createElement('div');
    this.elem.classList.add(`calendar${Math.round(Math.random() * 10000000000)}`);
    config.el.appendChild(this.elem);
    this.year = config.year || new Date().getFullYear();
    this.month = config.month || new Date().getMonth() + 1;
    this.refreshCalendar();
  };
  refreshCalendar () {
    this.elem.innerHTML = '';
    this.drawCalendar();
    (this.config.showDate || this.config.changeMonth) && this.addHead();
    this.insertTask();
  };
  drawCalendar () {
    drawCalendar(this.year, this.month, this.elem);
    this.table = this.elem.querySelector('.Calendar');
    if (this.config.customClass) this.table.classList.add(this.config.customClass);
    this.table.addEventListener('click', e => this.clickEvents(e.target));
    this.table.addEventListener('dblclick', e => this.dblClickEvents(e.target));
  };
  insertTask () {
    this.local().then(data => {
      for (let key in data) {
        const [day, month, year] = key.match(/(\d+)/g);
        if (this.month === +month && this.year === +year) {
          this.table.querySelectorAll('tbody td').forEach(td => {
            if (td.innerHTML && td.innerHTML.match(/\w+/)[0] === day) {
              data[key].forEach((task, i) => {
                const div = document.createElement('div');
                div.innerHTML = this.config.removeTask ? `<img src="https://syarmolenka.github.io/calendar/delete.png" class="delTask"><div class="task">${data[key][i]}</div>` : `<div class="task">${data[key][i]}</div>`;
                td.appendChild(div);
              });
            };
          });
        };
      };
    });
  };
  addHead () {
    const monthName = this.config.showDate ? `${new Date(this.year, this.month - 1, 5).toLocaleString(`en`, {month: 'long'}).toUpperCase()} / ${this.year}` : '';
    if (this.config.showDate && this.config.changeMonth) this.table.querySelector('thead').innerHTML = `<th class='prev pointer'>&#8656</th><th colspan='5'>${monthName}</th><th class='next pointer'>&#8658</th>${this.table.querySelector('thead').innerHTML}`;
    if (this.config.showDate && !this.config.changeMonth) this.table.querySelector('thead').innerHTML = `<th colspan='7'>${monthName}</th>${this.table.querySelector('thead').innerHTML}`;
    if (!this.config.showDate && this.config.changeMonth) this.table.querySelector('thead').innerHTML = `<th class='prev pointer' colspan='3'>&#8656</th><th></th><th class='next pointer' colspan='3'>&#8658</th>${this.table.querySelector('thead').innerHTML}`;
  };
  clickEvents (elem) {
    if (elem.matches('.prev')) {
      this.month--;
      if (this.month < 1) {
        this.year--;
        this.month = 12;
      };
      this.refreshCalendar();
    };
    if (elem.matches('.next')) {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      };
      this.refreshCalendar();
    };
    if (elem.matches('.delTask') && this.config.removeTask && window.confirm('Do you want to delete the message?')) {
      const td = elem.closest('td');
      const key = `${td.innerHTML.match(/\w+/)[0]}.${this.month}.${this.year}`;
      let index;
      td.querySelectorAll('.task').forEach((el, i) => { if (el === elem.parentNode) index = i; });
      this.local(null, [key, index]).then(_ => this.refreshCalendar());
      elem.parentNode.remove();
    };
  };
  dblClickEvents (elem) {
    if (elem.closest('tbody') && elem.innerText && this.config.addTask) {
      const data = window.prompt('Enter a new task');
      if (data) this.handlerData(elem.closest('td').innerHTML.match(/\w+/)[0], data);
    };
  }
  handlerData (day, data) {
    const date = `${day}.${this.month}.${this.year}`;
    this.local([date, data]).then(this.refreshCalendar.bind(this));
  };
  local (data, remove) {
    const getData = () => {
      return new Promise((resolve, reject) => {
        let data = window.localStorage.getItem(`calendar${this.number}`) || '{}';
        data = JSON.parse(data);
        resolve(data);
      });
    };
    const setData = (arr) => {
      return getData().then(data => {
        if (!data) data = {};
        if (!(arr[0] in data)) {
          data[arr[0]] = [];
        }
        data[arr[0]].push(arr[1]);
        window.localStorage.setItem(`calendar${this.number}`, JSON.stringify(data));
      });
    };
    const removeData = (key, index) => {
      return getData().then(data => {
        data[key].splice(index, 1);
        if (data[key].length === 0) delete data[key];
        window.localStorage.setItem(`calendar${this.number}`, JSON.stringify(data));
      });
    };
    if (remove) return removeData(remove[0], remove[1]); 
    if (!data) {
      return getData();
    } else {
      return setData(data);
    };
  };
};

export {Calendar};
