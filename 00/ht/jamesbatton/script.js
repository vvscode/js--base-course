var nameUser;
var ageUser;

nameUser= prompt("Ваше имя?", "");

while (!checkName(nameUser)) {
    nameUser = prompt("Имя не введено либо введено неверно. " +
        "Повторно введите свое имя", "");
};

function checkName(x) {
    return isNaN(x);
};

ageUser = prompt("Укажите Ваш возраст", "");

while (!checkAge(ageUser)) {
     ageUser = prompt("Данные возраста не введены либо введены неверно. " +
                      "Повторно введите данные", "");
};

function checkAge(x) {
    return !isNaN(x) && x > 0 && x < 120;
};

if (ageUser < 18) {
    alert("Здарова, " + nameUser + "." + " Как твои " + ageUser + "?");
} else {
    alert("Приветствую, " + nameUser + "." + " Уж " + ageUser + " лет прошло.");
};