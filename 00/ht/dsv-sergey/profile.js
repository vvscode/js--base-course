function profile() {
    let name, age, sayHallo = document.getElementById('sayHallo');

    while (name == undefined) {
        let validName;
        while (!validName) {
            name = prompt('Введите ваше имя');
            let RegExp = /^[А-Яа-яЁё]+$/;
            validName = RegExp.exec(name);
        }
    }

    while (age <= 0 || age == undefined || age > 100) {
        let validAge;
        while (!validAge){
            age = prompt('Введите ваш возраст');
            let RegExp = /^[0-9]+$/;
            validAge = RegExp.exec(age);
        }
    }

    if (age > 0 && age < 18) {
        sayHallo.innerHTML = 'Здарова, ' + name + '. Как твои ' + age + ' \?';
    } else if (age >= 18 && age < 100) {
        sayHallo.innerHTML = 'Привествую, ' + '<span>' + name + '</span>' + '. Уж ' + age + ' лет прошло.';
    }
}
profile();