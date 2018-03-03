var nameUser;
var ageUser;

nameUser= prompt("Ваше имя?", "");

while (!checkName(nameUser)) {
    nameUser = prompt("Имя не введено либо введено не верно. " +
        "Повторно введите свое имя", "");
};

function checkName(x) {
    if (isNaN(x) == false) return false;

    return true;
}

ageUser = prompt("Укажите Ваш возраст", "");

while (!checkAge(ageUser)) {
     ageUser = prompt("Данные возраста не введены либо введены не верно. " +
                      "Повторно введите данные", "");
};

function checkAge(x) {
    if (isNaN(x) == true || x <= 0 || x > 120) return false;

    return true;
};

if (ageUser < 18) {
    alert("Здарова, " + nameUser + "." + " Как твои " + ageUser + "?");
} else {
    alert("Приветствую, " + nameUser + "." + " Уж " + ageUser + " лет прошло.");
};































