document.addEventListener(`DOMContentLoaded`, function () { // обработать при загрузке
  pasteMonthsInSelect(document.querySelector(`#month`));
  pasteYearsInSelect (document.querySelector(`#year`));
  readFormLoacalHash();
  changeForm();
});

function pasteMonthsInSelect(selectElement) { // вставть options в select
  let month, def;
  if (`CalendarForm` in window.sessionStorage) { // выбрать нужный месяц
    let obj = JSON.parse(window.sessionStorage.getItem(`CalendarForm`));
    let date = obj.date.split(`,`);
    def = date[1];
  } else {def = new Date().getMonth() + 1} // или текущий месяц
  for (let i = 1; i < 13; i++) {
    let option = document.createElement(`option`);
    month = new Date(0, i).toLocaleString(`ru`, {
      month: `long`
    });
    month = month[0].toUpperCase() + month.slice(1);
    option.value = i;
    option.innerText = month;
    if (i === +def) option.selected = 1;
    selectElement.appendChild(option);
  }
}

function pasteYearsInSelect (selectElement) { // вставть options в select
  let def;
  if (`CalendarForm` in window.sessionStorage) { // выбрать нужный год
    let obj = JSON.parse(window.sessionStorage.getItem(`CalendarForm`));
    let date = obj.date.split(`,`);
    def = date[0];
  } else {def = new Date().getFullYear()} // или текущий год
  for (let i = 2100; i >= 1900; i--) {
    let option = document.createElement(`option`);
    option.value = option.innerText = i;
    if (i === +def) option.selected = 1;
    selectElement.appendChild(option);
  }
}

function changeForm() { // обновить объект календаря и окно с кодом согласно данным формы, сохранить в local
  let objectClendar = document.querySelector(`.calendar`).creator;
  let setup = getSetupObject();
  let date = setup.date.split(`,`);
  objectClendar.year = date[0];
  objectClendar.month = date[1];
  objectClendar.htmlEl = document.querySelector(setup.el);
  objectClendar.showMonth = setup.showMonth;
  objectClendar.allowChangeMonth = setup.allowChangeMonth;
  objectClendar.allowAdd = setup.allowAdd;
  objectClendar.allowRemove = setup.allowRemove;
  objectClendar.addClass = setup.addClass;
  objectClendar.refreshCalendar();
  saveFormLoacalHash();
  addTextInPre(setup);
}

document.addEventListener(`change`, function (e) { // при изменении формы - обновлять данные объекта...
  if (!e.target.closest(`form`)) return;
  changeForm();
});
document.forms.setup.elements.addClass.oninput = changeForm; // при печатании класса тоже самое...

function saveFormLoacalHash() { // упаковка объекта конфигурации и сохранение в local
  window.sessionStorage.setItem(`CalendarForm`, JSON.stringify(getSetupObject()));

}

function readFormLoacalHash() { // распаковка и чтение данных из local
  if (`CalendarForm` in window.sessionStorage) {
    let form = document.forms.setup;
    let obj = JSON.parse(window.sessionStorage.getItem(`CalendarForm`));
    form.elements.showMonth.checked = obj.showMonth;
    form.elements.allowChangeMonth.checked = obj.allowChangeMonth;
    form.elements.allowAdd.checked = obj.allowAdd;
    form.elements.allowRemove.checked = obj.allowRemove;
    form.elements.addClass.value = obj.addClass;
    changeForm();
  }
}

function getSetupObject() { // создает объект конфигурации календаря
  let form = document.forms.setup;
  function ChosenSelect(select) { // выбрать из select дату
    let arr = select.options;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        return arr[i].value;
      }
    }
  }
  let year = ChosenSelect(form.elements.year);
  let month = ChosenSelect(form.elements.month);
  return {
    el:`#calendar`,
    showMonth: form.elements.showMonth.checked,
    allowChangeMonth: form.elements.allowChangeMonth.checked,
    allowAdd: form.elements.allowAdd.checked,
    allowRemove: form.elements.allowRemove.checked,
    addClass: form.elements.addClass.value || ``,
    date: `${year},${month}`
  }
}

new Calendar (getSetupObject()); // создать календарь

function addTextInPre(obj) { // запись кода в блок
  let pre = document.querySelector(`#code>pre`);
  pre.innerText = `<script src="https://syarmolenka.github.io/calendar.js"></script>
  <script>
    (function() {
      let id = 'calendar' + Math.round(Math.random()*1000000);
      document.write('<div id="'+id+'"></div');
      let link = document.createElement('link');
      link.setAttribute('rel', "stylesheet");
      link.setAttribute('href', "https://syarmolenka.github.io/style.css");
      document.head.appendChild(link);
      new Calendar({
        el: '#'+id,
        showMonth: ${obj.showMonth},
        allowChangeMonth: ${obj.allowChangeMonth},
        allowAdd: ${obj.allowAdd},
        allowRemove: ${obj.allowRemove},
        addClass: '${obj.addClass}',
        date: '${obj.date}'
      })
    }) ();
  </script>`;
}
