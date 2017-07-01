var div = document.querySelector('div.main');
var index = {
    name: 'index',
    match: '',
    onBeforeEnter: () => console.log(`onBeforeEnter index`),
    onEnter: () => div.innerHTML = 'Это самая крутая игра в Мире. Правил в ней нет, делай что хочешь P.S. Я сам не знаю )',
    onLeave: () => console.log('onLeave index')
};

export { index };