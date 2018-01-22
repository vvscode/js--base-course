'use strict';
let newEventBus = new EventBus();
let preBt = document.querySelector('#pre');
let playBt = document.querySelector('#play');
let nextBt = document.querySelector('#next');
let numberX = document.querySelector('#number_x');
let numberY = document.querySelector('#number_y');
let speed = document.querySelector('#range');
let divWithGame = document.querySelector('.main_game_life');
let gamePlace = document.querySelector('#game_show');
let imageMode = '';
let spanSpeed = document.querySelector('.speed');
let SPEEDCONSTFORTIME = 50;

spanSpeed.innerHTML = ` = ${(speed.value * SPEEDCONSTFORTIME + 100) / 1000}сек`;

//обработчик на pre
preBt.addEventListener('click',()=>{
    newEventBus.trigger('вернуться на шаг назад');
});

//обработчик на next
nextBt.addEventListener('click',()=>{
  newEventBus.trigger('вернуться на шаг вперед');
});

//обработчик на play
playBt.addEventListener('click',()=>{
    let a = playBt.getAttribute('class');
    playBt.innerHTML = '||';



    if(a === 'play'){
      newEventBus.trigger('нажата play');
      playBt.setAttribute('class', 'stop');
      playBt.innerHTML = '||';
      playBt.setAttribute('game', true);
    }

    if(a === 'stop'){
        playBt.setAttribute('class', 'play');
        playBt.innerHTML = '>';
        newEventBus.trigger('нажата stop');
        playBt.removeAttribute('game');
        newEventBus.off('изменено поле по speed в процессе работы');
    }
});

//обработчик на number_x
numberX.addEventListener('change',()=>{
    newEventBus.trigger('изменено поле по X', numberX.value);
    divWithGame.style.width = numberX.value + 'px';
});

//обработчик на number_y
numberY.addEventListener('change',()=>{
    newEventBus.trigger('изменено поле по Y', numberY.value);
    divWithGame.style.height = numberY.value + 'px';
});

//обработчик на speed
speed.addEventListener('input',()=>{
    spanSpeed.innerHTML = ` = ${(speed.value * SPEEDCONSTFORTIME + 100) / 1000}сек`;
    newEventBus.trigger('изменено поле по speed', Math.floor(speed.value * SPEEDCONSTFORTIME + 100));
    newEventBus.trigger('изменено поле по speed в процессе работы', Math.floor(speed.value * 50 + 100));
});

//обработчик для отображения игры
gamePlace.addEventListener('click',(event)=>{
  newEventBus.trigger('начата расстановка начальных фигур', event);
});

newEventBus.on('текущая открытая страница', (value)=>{
  Promise.resolve(value)
    .then((value)=>{
      imageMode = value;
      newEventBus.trigger('начата расстановка начальных фигур');
    })
});

newEventBus.on('изменился массив для отображения', (arr)=>{
  Promise.resolve(arr)
    .then((arr)=>{
      newEventBus.trigger('рисуем', arr, imageMode);
    })
});

newEventBus.on('остановить/воспроизвести', ()=>{
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


