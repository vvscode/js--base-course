var t= new Date();
var mont= t.getMonth();
var yer=t.getFullYear();
function createCalendar(id, year, month) {
    var elem = document.getElementById(id);
    var mon = month;
    var d = new Date(year, mon);
    var arrMonth =['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

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

createCalendar("calendar",yer,mont);
ForwardButton.addEventListener('click',functionForward);
BackButton.addEventListener('click',backFunction);
TegTitle.addEventListener('dblclick',functionTitle);
var td = document.querySelectorAll('td');
//console.log()
for(var i=0; i<td.length; i++){
    td[i].ondblclick = function () {
        var line=prompt('Какие планы на денек?','kill all');
        this.innerHTML+='<div>' +line+'   ' + '<span>x</span>'+ '</div>';
    }
}
