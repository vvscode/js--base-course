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

class SendRequestData {
  constructor (name, folder, remote) {
    this.name = name;
    this.folder = `calendar${folder}`;
    this.remote = remote;
    this.getUID();
  };
  handler (...args) {
    if (this.remote === 'local') return this.local(...args);
    if (this.remote === 'server') {
      return this.url ? this.server(...args) : this.getUID().then(_ => this.server(...args));
    };
  };
  getUID () {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(window.localStorage.getItem(this.name));
      if (data && data.uid) {
        this.uid = data.uid;
      } else {
        this.uid = `${Date.now()}${Math.round(Math.random() * 1000000000)}`;
        window.localStorage.setItem(this.name, JSON.stringify({uid: this.uid}));
      };
      resolve(this.uid);
    }).then(uid => {
      this.url = `https://${this.name}.firebaseio.com/users/${uid}/${this.folder}`;
    });
  };
  local (method, key, text) {
    switch (method) {
      case 'get':
        return new Promise((resolve, reject) => {
          const data = JSON.parse(window.localStorage.getItem(this.name));
          resolve(data[this.folder]);
        });
      case 'put':
        return Promise.resolve().then(_ => {
          const data = JSON.parse(window.localStorage.getItem(this.name));
          if (!(this.folder in data)) data[this.folder] = {};
          if (data[this.folder][key]) {
            data[this.folder][key].push(text);
          } else {
            data[this.folder][key] = [text];
          };
          window.localStorage.setItem(this.name, JSON.stringify(data));
        });
      case 'delete':
        return Promise.resolve().then(_ => {
          const data = JSON.parse(window.localStorage.getItem(this.name));
          data[this.folder][key].splice(text, 1);
          window.localStorage.setItem(this.name, JSON.stringify(data));
        });
      default:
        return Promise.resolve();
    }
  };
  server (method, key, text) {
    switch (method) {
      case 'get':
        return fetch(`${this.url}.json`, {method: 'GET'})
          .then(respon => respon.text())
          .then(data => JSON.parse(data));
      case 'put':
        return fetch(`${this.url}/${key}.json`, {method: 'GET'})
          .then(respon => respon.text())
          .then(data => JSON.parse(data))
          .then(data => {
            if (data) {
              data.push(text);
            } else {
              data = [text];
            };
            return fetch(`${this.url}/${key}.json`, {method: 'PUT', body: JSON.stringify(data)});
          });
      case 'delete':
        return fetch(`${this.url}/${key}.json`, {method: 'GET'})
          .then(respon => respon.text())
          .then(data => JSON.parse(data))
          .then(data => {
            data.splice(text, 1);
            return fetch(`${this.url}/${key}.json`, {method: 'PUT', body: JSON.stringify(data)});
          });
      default:
        return Promise.resolve();
    }
  }
};

class Calendar {
  constructor (config) {
    this.config = config;
    this.number = document.body.querySelectorAll('.Calendar').length || 0;
    this.sendRequestData = new SendRequestData('calendar-yarmolenka', this.number, this.config.storage);
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
    this.sendRequestData.handler('get').then(data => {
      for (let key in data) {
        const [day, month, year] = key.match(/(\d+)/g);
        if (this.month === +month && this.year === +year) {
          this.table.querySelectorAll('tbody td').forEach(td => {
            if (td.innerHTML && td.innerHTML.match(/\w+/)[0] === day) {
              data[key].forEach((task, i) => {
                if (!task) return;
                const div = document.createElement('div');
                div.innerHTML = this.config.removeTask ? `<img src="https://syarmolenka.github.io/calendar/delete.png" alt="image" class="delTask"><div class="task">${task}</div>` : `<div class="task">${task}</div>`;
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
    if (elem.matches('.delTask') && this.config.removeTask) {
      const td = elem.closest('td');
      const day = td.innerHTML.match(/\w+/)[0];
      const key = `${day}-${this.month}-${this.year}`;
      let index, task;
      td.querySelectorAll('.task').forEach((el, i) => {
        if (el.parentNode === elem.parentNode) {
          index = i;
          task = el.innerText;
        };
      });
      this.modalQuestion([day, this.month, this.year], task).then(_ => {
        this.sendRequestData.handler('delete', key, index);
        elem.parentNode.remove();
      });
    };
  };
  dblClickEvents (elem) {
    elem.closest('tbody') && elem.innerText && this.config.addTask && this.modalConversation([elem.closest('td').innerHTML.match(/\w+/)[0], this.month, this.year]);
  };
  coverScreen () {
    const div = document.createElement('div');
    div.classList.add('cover');
    document.body.appendChild(div);
    return div;
  };
  modalConversation (date) {
    const key = `${date[0]}-${date[1]}-${date[2]}`;
    const root = this.coverScreen();
    switch (this.config.message) {
      case 'DOM':
        root.innerHTML = `<form class="conversation">
        <h3>${date[0]} ${new Date(0, date[1]).toLocaleString(`en`, {month: 'long'}).toUpperCase()} ${date[2]}</h3>
        <hr/>
        <span>Enter a new task</span>
        <input type="text" placeholder="Task..." autofocus />
        <button>Add Task</button>
        </form>`;
        root.addEventListener('click', e => {
          if (e.target === root) root.remove();
          if (e.target.innerText === 'Add Task') {
            const input = e.target.parentNode.querySelector('input');
            if (input.value.trim()) {
              this.sendRequestData.handler('put', key, input.value).then(_ => this.refreshCalendar());
              root.remove();
            } else {
              input.classList.add('redBorder');
              input.focus();
              setTimeout(_ => input.classList.remove('redBorder'), 500);
            };
          };
        });
        document.body.onkeydown = e => {
          if (e.keyCode === 27) {
            root.remove();
            document.body.onkeydown = null;
          };
        };
        break;
      case 'BOM':
        setTimeout(_ => {
          const data = window.prompt('Eneter a new task');
          if (data) this.sendRequestData.handler('put', key, data).then(_ => this.refreshCalendar());
          root.remove();
        }, 50);
        break;
    };
  };
  modalQuestion (date, task) {
    return new Promise((resolve, reject) => {
      const root = this.coverScreen();
      switch (this.config.message) {
        case 'DOM':
          root.innerHTML = `<form class="question">
          <h3>${date[0]} ${new Date(0, date[1]).toLocaleString(`en`, {month: 'long'}).toUpperCase()} ${date[2]}</h3>
          <hr/>
          <span>Do you really want to delete the task?</span>
          <h4>${task}</h4>
          <div><button>Yes</button><button>No</button></div>
          </form>`;
          root.addEventListener('click', e => {
            if (e.target === root || e.target.innerText === 'No') root.remove();
            if (e.target.innerText === 'Yes') {
              root.remove();
              resolve();
            };
          });
          document.body.onkeydown = e => {
            if (e.keyCode === 27) {
              root.remove();
              document.body.onkeydown = null;
            };
          };
          break;
        case 'BOM':
          setTimeout(_ => {
            window.confirm('Do you want to delete the task?') ? resolve() : 0;
            root.remove();
          }, 50);
          break;
      };
    });
  };
};

export {Calendar};
