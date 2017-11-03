var nowDate = new Date();
let nowYear =  nowDate.getFullYear();
var nowMonth = nowDate.getMonth();

function createCalendar(id, year, month) {
    let daysOfLastMonth = '';
    let daysOfThisMonth = '';
    let daysNextMonth = '';
    let elem = document.getElementById(id);
    let d = new Date(year, month);
    let daysOfTheWeek = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
// заполнить первый ряд от понедельника и до дня, с которого начинается месяц * * * | 1  2  3  4
    for (let i = 0; i < getNumDay(d); i++) {
        daysOfLastMonth += '<td></td>';
    }
// ячейки календаря с датами
    while (d.getMonth() === month) {
        daysOfThisMonth += '<td>' + d.getDate() + '</td>';
        if (getNumDay(d) % 7 === 6) { // вс, последний день - перевод строки
            daysOfThisMonth += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }
// добить таблицу пустыми ячейками, если нужно
    if (getNumDay(d) !== 0) {
        for (let i = getNumDay(d); i < 7; i++) {
            daysNextMonth += '<td></td>';
        }
    }
// только одно присваивание innerHTML
    elem.innerHTML = daysOfTheWeek + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></table>';

    let allTd = document.querySelectorAll('td');
    addClassTd(allTd, 'days_Of_Last_Month', 'days_Of_This_Month', 'days_name');
}

/*функция добавления классов в ячейки*/

function addClassTd(arr, className1, className2, className3 ) {
    arr.forEach(function(a){
        if ( a.innerHTML.valueOf() > 0 && a.innerHTML.valueOf() < 32){
            a.className = className2
        } else if ( isNaN(a.innerHTML.valueOf()) ) {
            a.className = className3
        } else {
            a.className = className1
        }
    })
}

/*функция получения номера дня недели от 0(пн) до 6(вс)*/

function getNumDay(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
}

/*функция получения названия месяца*/

function addNameMonth(month) {
    let nameMonth = '';
    let arrNameMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    arrNameMonth.forEach(function(item, i){
        if( month === i ){
           nameMonth += item ;
        }
    });
    return nameMonth;
}

createCalendar("calendar", nowYear, nowMonth);

function addMonth () {
    debugger;
    return nowMonth += 1 ;
}

function takeAwayMonth() {
    debugger;
    return nowMonth -= 1 ;
}

var prev = document.getElementById('left_Button');
var next = document.getElementById('right_Button');

prev.addEventListener('click', function() {
    takeAwayMonth();
    createCalendar("calendar", nowYear, nowMonth);
});
next.addEventListener('click', function() {
    addMonth ();
    createCalendar("calendar", nowYear, nowMonth);
});

/*<!DOCTYPE html>

<html>
<head>
<title>Untitled</title>
<meta charset="utf-8">
    <style type="text/css">
    td{
    border: 1px solid #0000FF;
}

</style>
</head>

<body>
<div class="container">
    <button>Prev</button><button>Next</button> <br>
    <div id="calendar"></div>
    </div>
    <script>

var button = document.getElementsByTagName('button');
var all_td = 0;
var now = new Date();
var month = new Date().getMonth();
var today = now.getDate();
function create(num)
{
    month += (num || 0)
    now = new Date();
    now.setMonth(month)


//Пустые ячейки в начале месяца
    now.setDate(1);
    var blank = (now.getDay()==0)?6:now.getDay() - 1;
    var text = "<table><tr>";
    for(var i=0; i<blank; i++)
        text+="<td>&nbsp;</td>";
    all_td = blank;

//Дни в месяце
    now.setMonth(now.getMonth() + 1)
    now.setDate(0);
    var days = now.getDate();
    for(var k=1; k<=days; k++){
        text+="<td>"+k+"</td>";
        all_td++;
        if(all_td%7==0){text+="</tr><tr>";}
    }
//Пустые ячейки в конце
    var last = now.getDay();
    var last_blank = (last==0)?0:7-last;
    for(var k=1; k<=last_blank; k++){
        text+="<td>&nbsp;</td>";
    }

    text +="</tr></table>";
    document.getElementById('calendar').innerHTML = text;
}
create()
var item = document.querySelectorAll('button');
item[0].addEventListener('click', function() {
    create(-1)
});
item[1].addEventListener('click', function() {
    create(1)
});
</script>

</body>
</html>*/
