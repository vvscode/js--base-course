var name = requestTextInput("Как тебя зовут?");
var age = requestTextInput("Сколько тебе лет?");

if (age < 18) {
    alert('Здарова, ' + name + '. Как твои ' + age + '?');
} else {
    alert('Привествую, ' + name + '. Уж ' + age + ' лет прошло');
}

function requestTextInput(message) {
    var input;
    do {
        input = prompt(message, '');
    } while (input === null || input === '');
    return input;
}