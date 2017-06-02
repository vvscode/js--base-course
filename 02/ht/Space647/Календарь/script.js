var t= new Date();
var mont= t.getMonth();
var yer=t.getFullYear();
var cal = document.querySelector('#calendar');
function createCalendar(id, year, month) {
    var elem = document.getElementById(id);
    var mon = month;
    var d = new Date(year, mon);
    var arrMonth =['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    var table = '<table align="center"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() == mon) {

        table += `<td class="d${d.getDate()}_${month}_${year}">${d.getDate()}</td>`;

        if (getDay(d) % 7 == 6) {
            table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }
    table += '</tr></table>';
    elem.innerHTML = table;
    TegMonth.innerHTML=arrMonth[month]+'  '+yer;
    if(localStorage.getItem('first')=='Заголовок'){}
    else {
        TegTitle.innerHTML=localStorage.getItem('first');
    }
    var calend = document.getElementById('calendar');
    var table = calend.querySelector('table');
    table.addEventListener('dblclick',addEvent);
    table.addEventListener('click',del);
    loadFromLS()
}
function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}
function functionForward() {
      t.setMonth(t.getMonth() + 1);
      mont=t.getMonth();
      yer=t.getFullYear();
      console.log(mont,yer);
      createCalendar("calendar", yer, mont);
}
function backFunction() {
    t.setMonth(t.getMonth() -1);
    mont=t.getMonth();
    yer=t.getFullYear();
    console.log(mont,yer);
    createCalendar("calendar", yer, mont);
}
function functionTitle() {
    var str=prompt('Введите заголовок','заголовок');
    localStorage.setItem('first', str);
    TegTitle.innerHTML=str;
}
function addEvent(e){
    var target = e.target;
    if (target.tagName !== 'TD') return;
    var date = target.className;
    var line = prompt('Какие планы у вас на этот день?', 'Убивать всех!');
    if (!line) return;
    target.innerHTML += `<div id="events">${line}<button class="cross">x</button></div>`;
    addEventLS(date, line);
}
function del(e){
    var target = e.target;
    if (target.tagName !== 'BUTTON') return;
    var text = target.parentNode.innerHTML.slice(0, -34);
    var date = target.parentNode.parentNode.className;
    target.parentNode.remove();
    var LS = JSON.parse(localStorage.getItem('myCalendar'));
    var index = LS[date].indexOf(text);
    console.log(index);
    LS[date].splice(index, 1);
    if (LS[date].length === 0) delete LS[date];
    localStorage.setItem('myCalendar', JSON.stringify(LS));

}
function addEventLS(date, text) {
    var LS = JSON.parse(localStorage.getItem('myCalendar')) || {};
    LS[date] = LS[date] || [];
    LS[date].push(text);
    localStorage.setItem('myCalendar', JSON.stringify(LS));
}
function loadFromLS() {
    var recObj = JSON.parse(localStorage.getItem('myCalendar'));
    for (key in recObj) {
        var res = cal.querySelector(`.${key}`);
        if (res != null){
            if (recObj[key].length - 1 == 0){
                res.innerHTML += `<div id="events">${recObj[key]}<button class="cross">x</button></div>`;
            }
            else {
                for (var i = 0; i < recObj[key].length; i++){
                    var dbArr = recObj[key];
                    res.innerHTML += `<div id="events">${dbArr[i]}<button class="cross">x</button></div>`;
                }
            }
        }
    }
}
createCalendar("calendar",yer,mont);
ForwardButton.addEventListener('click',functionForward);
BackButton.addEventListener('click',backFunction);
TegTitle.addEventListener('dblclick',functionTitle);
var calend = document.getElementById('calendar');
var table = calend.querySelector('table');
table.addEventListener('dblclick',addEvent);
table.addEventListener('click',del);