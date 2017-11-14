function log(a) {
    console.log(a);
}
function FizzBuzz(){
    var arr =[];
    for(var a = 1;a<=100;a++) {
        arr.push(a);
    }
    for(var a = 2;a<=100;a+=3) {
        arr[a] ='Fizz';
    }
    for(var a = 4;a<=100;a+=5) {
        arr[a] ='Buzz';
    }
    for(var a = 14;a<=100;a+=15) {
        arr[a] ='FizzBuzz';
    }
    for(var a = 0;a<=99;a++) {
        log(arr[a]);
    }
}

function isPolindrom(str) {
    var reversStr = str.split("").reverse().join("");
    if(str===reversStr)
        return true;
    else return false;
}

function drawCalendar(year,month,htmlElement) {

    function getDayNumber(date) { 
        var number = date.getDay();
        if(number === 0)
            return number = 6;
        else  return number - 1;

    }

    var now = new Date(year,month-1);

    var Calendar = '<table><tr>';
    for(var i=0;i<getDayNumber(now);i++) {
        Calendar+='<th></th>';
    }
    while(now.getMonth()===month-1) {
        Calendar += '<td>' + now.getDate() + '</td>';
        if (getDayNumber(now) % 7 === 0) { 
            Calendar += '</tr><tr>';
        }
        now.setDate(now.getDate() + 1);
    }
    Calendar += '</tr></table>';
    console.log(Calendar);
}
 drawCalendar(2015,4);