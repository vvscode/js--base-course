"use strict";

    while (true) {
        var name = prompt("Enter your name: ", '');
        if (name && name!='null' && isNaN(name)) {
            break;
        }
    };
    function isNumeric(n) {
        return !isNaN(parseFloat(n))&&isFinite(n);

    };

    while (true) {
        var age = prompt("Enter your age: ", '');
        if (isNumeric(age)&&age>0) {
            break;
        }
    };


window.onload = function() {

        if (age<18) {
            return document.getElementById('txt').innerText = 'Здарова, ' + name + '. Как твои ' + age + '?';
        }
        else {
            return document.getElementById('txt').innerText = 'Привествую, '+name+ '. Уж ' + age + ' лет прошло';
        }
};


