var t= new Date();
var mont= t.getMonth();
var yer=t.getFullYear();
var obj={};
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

        table += '<td class="'+d.getDate()+'">' + d.getDate() + '</td>';

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

    if(target.tagName != 'TD') {
        return;
    }
    else {
        var line=prompt('Введите ваши планы на день','kill all');
        if(line==null) {}
        else {
            target.innerHTML +='<div>'+line+'<button >x</button>'+'</div>';
            var from = target.innerHTML.search('<div');
            if (from > 0) {
                date = target.innerHTML.substring(0, from) + '_' + mont + '_' + yer;
            }
            else{
                date = target.innerHTML + '_' + mont + '_' +  yer;
            }
            addEventLS(date,line)
        }

    }
}
function del(e){
    var targer=e.target;
    if(targer.tagName !='BUTTON') {
        return;}
    else {
        targer.parentNode.remove();
    }

}
function addEventLS(date, text) {
    if (obj[date]){
        obj[date].push(text);
    }
    else {
        var arr = [];
        arr.push(text);
        obj[date] = arr;
    }
    localStorage.setItem('myCalendar', JSON.stringify(obj));
}
createCalendar("calendar",yer,mont);
ForwardButton.addEventListener('click',functionForward);
BackButton.addEventListener('click',backFunction);
TegTitle.addEventListener('dblclick',functionTitle);
var calend = document.getElementById('calendar');
var table = calend.querySelector('table');
table.addEventListener('dblclick',addEvent);
table.addEventListener('click',del);