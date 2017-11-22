
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

/**
 * Функция тормозящая вызов обработчика
 * @param {*} func Функция обработчика
 * @param {*} ms количество мс
 * @return {wrapper} функция обёртка, передающая вызов func не чаще, чем раз в ms миллисекунд
 */
function debounce(func, ms) {
    var state = 0;
    var funcArguments;
    var funcThis;
    function wrapper () {
        if (state) {
            funcArguments = arguments;
            funcThis = this;
             return;
        }
        func.apply(this, arguments);
        state = 1;
        setTimeout(function () {
            state = 0;
            if (funcThis) {
                wrapper.apply(funcThis, funcArguments);
                funcArguments = funcThis = null;
            }
        }, ms);
    }
    return wrapper;
}
//Функция для обработки события
function f() {
    getSuggestions(input.value, showSuggestions);
}
//Функция для обработки события, срабатывает не чаще, чем раз в 1000 миллисекунд
var keyUpHandler = debounce(f, 1000);
input.addEventListener('keyup', keyUpHandler);