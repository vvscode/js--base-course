'use strict';
let newEventBus = new EventBus();
let preBt = document.querySelector('#pre');
let playBt = document.querySelector('#play');
let nextBt = document.querySelector('#next');
let numberX = document.querySelector('#number_x');
let numberY = document.querySelector('#number_y');
let speed = document.querySelector('#range');

let divWithGame = document.querySelector('.main_game_life');
/*let spaceGame = document.querySelector('.main_game_life pre');*/
//обработчик на pre
preBt.addEventListener('click',()=>{
   alert('pre')
});

//обработчик на play
playBt.addEventListener('click',()=>{
    let a = playBt.getAttribute('class');
    playBt.innerHTML = '&#9655;';

    if(a === 'play'){
      newEventBus.trigger('нажата play');
      playBt.setAttribute('class', 'stop');
      playBt.innerHTML = '&#8741;';
    }

    if(a === 'stop'){
        playBt.setAttribute('class', 'play');
        playBt.innerHTML = '&#9655;';
        newEventBus.trigger('нажата stop');
        newEventBus.off('изменено поле по speed в процессе работы');
    }
});

//обработчик на play
nextBt.addEventListener('click',()=>{
    alert('next')
});

//обработчик на number_x
numberX.addEventListener('change',()=>{
    newEventBus.trigger('изменено поле по X', numberX.value);
    divWithGame.style.width = numberX.value + 'px';
    console.log('x1 = ' + numberX.value);
});

//обработчик на number_y
numberY.addEventListener('change',()=>{
    newEventBus.trigger('изменено поле по Y', numberY.value);
    divWithGame.style.height = numberY.value + 'px';
    console.log('y1 = ' + numberY.value);
});

//обработчик на speed
speed.addEventListener('change',()=>{
    alert('текущая скорочть - ' + Math.floor(speed.value * 50 + 100)/1000 + ' - сек');
    newEventBus.trigger('изменено поле по speed', Math.floor(speed.value * 50 + 100));
    newEventBus.trigger('изменено поле по speed в процессе работы', Math.floor(speed.value * 50 + 100));
});
