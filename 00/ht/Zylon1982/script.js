window.onload = function gettingKnow() {
    var name = prompt('Как ваше имя?');
    var age = prompt('Сколько вам лет?');

    if(age === '' || isNaN(age) === true || name === '' || age === null || name === null){
        gettingKnow();
    }
    else if(age < 18){
        document.writeln('Здарова, ' + name + '. Как твои ' + age + '?');
    }
    else {
        document.writeln('Привествую, ' + name + '. Уж ' + age + ' лет прошло.');
    }
}
