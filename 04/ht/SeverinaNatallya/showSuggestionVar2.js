
function getSuggestions(text, cb) {
    var len = 20 - ('' + text).length;
    var ret = [];
    for (var i = 0; i < len; i++) {
        ret.push(text + ' ' + i);
    }
    setTimeout(cb, len * 100, ret);
}

function showSuggestions(list) {
    document.querySelector('pre').innerHTML = list.join('\n');
}
var input = document.querySelector('input');
var timerId;//переменная для сохранения идентификатора таймера
var startTyping = Date.now();//фиксация времени начала печати
//функция обработчик нажатия клавиш
function keyUpHandler() {
    clearTimeout(timerId);//очистка таймера
    if ((Date.now() - startTyping) < 500) {//если быстро набирается запрос
        startTyping = Date.now();
        timerId = setTimeout(f => getSuggestions(input.value, showSuggestions), 1000);//должен сработать только если последний символ был набран быстро
        return;
    }
    else {//если медленно набирается запрос
        startTyping = Date.now();
        getSuggestions(input.value, showSuggestions);
    }
}
input.addEventListener('keyup', keyUpHandler);