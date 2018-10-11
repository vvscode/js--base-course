"use strict";

document.getElementById('data').onsubmit = function() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var sex = document.getElementsByName('sex');
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    var license = document.getElementById('license').checked ? "Есть" : "Нет";
    var comment = document.getElementById('comment').value;
    console.log(name, age, sex, license, comment);
    
    document.getElementById('outputInfo').innerHTML =
        '<p>Имя: ' + name + '</p>' +
        '<p>Возраст: ' + age + '</p>' +
        '<p>Пол: ' + sex + '</p>' +
        '<p>Водительское удостоверение: ' + license + '</p>' +
        '<p>О себе: ' + comment + '</p>';

    document.getElementById('data').reset();
    return false;
};

