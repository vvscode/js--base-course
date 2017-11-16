function log(a) {
    console.log(a);
}
function fizzBuzz(){
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
    return str===reversStr;
}

function drawCalendar(year,month,htmlElement) {

    function getDayNumber(date) { 
        var number = date.getDay();
        if(number === 0)
        {
            return number = 6;
        }
        else  return number - 1;

    }
    var now = new Date(year,month-1);

    var Calendar = '<table><tr>';
    for(var i=0;i<getDayNumber(now);i++) {
        Calendar+='<th></th>';
    }
    while(now.getMonth()===month-1) {

        Calendar += '<td>' + now.getDate() + '</td>';
        if (getDayNumber(now) % 6 === 0 && getDayNumber(now)!==0) {
            console.log(getDayNumber(now));
            Calendar += '</tr><tr>';
        }
        now.setDate(now.getDate() + 1);
    }
    Calendar += '</tr></table>';
    htmlElement.innerHTML= Calendar;
}

function isDeepEqual(objA, objB) {
    if (typeof(objA)==="object" && objA != null && typeof(objB) === "object" && objB != null) {
        if (Object.values(objA).length != Object.values(objB).length) 
        {
            return false;
        }
        for(var prop in objA) 
        {
            if (!isDeepEqual(objA[prop], objB[prop]))
            {
                return false;
            }
        }
        return true; 
    }
    return objA == objB; 
}
