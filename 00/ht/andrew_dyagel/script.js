var nameOfPerson = "";
var yearsOld = 0;

while (!nameOfPerson && !yearsOld) {
    nameOfPerson = prompt("Как Вас зовут?", "");
    yearsOld = +prompt("Укажите свой возраст.", "");
}

if (yearsOld < 18) {
    document.getElementById("greating").innerHTML =
        'Здарова, ' + nameOfPerson + '. Как твои ' + yearsOld + '?';
} else {
    document.getElementById("greating").innerHTML =
        'Привествую, ' + nameOfPerson + '. Уж ' + yearsOld + ' лет прошло.';
}