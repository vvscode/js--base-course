//var name = prompt('Как Ваше имя?', 'Имя');
//var years = prompt('Сколько вам лет?', 100);

var namex = null;
var yearsx = 0;

function fname() {
    var name = prompt('Как Ваше имя?', 'Имя');
    return name;
}

function fyears() {
    var years = prompt('Сколько вам лет?', 100);
    return years;
}

//var name = fname();
while (namex===null || namex ==="") {
    namex = fname();
}

//var years = fyears();
while (yearsx<1 ) {
    yearsx = fyears();
}

var myHeading = document.querySelector('#Hello');

if (yearsx<18)
{myHeading.textContent = 'Здарова, '+namex+'. Как твои '+yearsx+'?';}
else
{myHeading.textContent = 'Привествую, '+namex+'. Уж '+yearsx+' лет прошло';}

