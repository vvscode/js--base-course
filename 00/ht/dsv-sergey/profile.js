function profile() {
    let name, age, sayHallo = document.getElementById('sayHallo');

    while (name == undefined || name == '' || name == ' ') {
        name = prompt('Введите ваше имя');
    }

    while (age == 0 || age == false || age == "" || age == null || age == undefined || age == NaN || Number(age) == NaN || age > 100) {
        age = prompt('Введите ваш возраст')
    }

    if (age > 0 && age < 18) {
        sayHallo.innerHTML = 'Здарова, ' + name + '. Как твои ' + age + ' \?';
    } else if (age >= 18 && age < 100) {
        sayHallo.innerHTML = 'Привествую, ' + name + '. Уж ' + age + ' лет прошло.';
    }
}
profile();