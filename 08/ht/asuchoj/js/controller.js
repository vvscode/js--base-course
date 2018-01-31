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
preBt.addEventListener('click',()=>newEventBus.trigger('goBackOneStep'));

//обработчик на next
nextBt.addEventListener('click',()=>newEventBus.trigger('goOneStepFurther'));

//обработчик на play
playBt.addEventListener('click',()=>{
    let a = playBt.getAttribute('class');
    playBt.innerHTML = '||';

    if(a === 'play'){
      newEventBus.trigger('pressedPlay');
      playBt.setAttribute('class', 'stop');
      playBt.innerHTML = '||';
      playBt.setAttribute('game', true);
    }

    if(a === 'stop'){
        playBt.setAttribute('class', 'play');
        playBt.innerHTML = '>';
        newEventBus.trigger('pressedStop');
        playBt.removeAttribute('game');
        newEventBus.off('theSpeedFieldIsChangedDuringOperation');
    }
});

//обработчик на number_x
numberX.addEventListener('change',()=>{
    newEventBus.trigger('x_fieldChanged', numberX.value);
    divWithGame.style.width = numberX.value + 'px';
});

//обработчик на number_y
numberY.addEventListener('change',()=>{
    newEventBus.trigger('y_fieldChanged', numberY.value);
    divWithGame.style.height = numberY.value + 'px';
});

//обработчик на speed
speed.addEventListener('input',()=>{
    spanSpeed.innerHTML = ` = ${(speed.value * SPEEDCONSTFORTIME + 100) / 1000}сек`;
    newEventBus.trigger('changedFieldBySpeed', Math.floor(speed.value * SPEEDCONSTFORTIME + 100));
    newEventBus.trigger('theSpeedFieldIsChangedDuringOperation', Math.floor(speed.value * 50 + 100));
});

//обработчик для отображения игры
gamePlace.addEventListener('click',(event)=> newEventBus.trigger('setUpTheInitialFigures', event));

newEventBus.on('currentOpenPage', (value)=>{
  Promise.resolve(value)
    .then((value)=>{
      imageMode = value;
      newEventBus.trigger('setUpTheInitialFigures');
    })
});

newEventBus.on('changedArrayToDisplay', (arr)=>{
  Promise.resolve(arr)
    .then((arr)=> newEventBus.trigger('draw', arr, imageMode))
});

newEventBus.on('stop/play', ()=>{
  let a = playBt.getAttribute('class');
  playBt.innerHTML = '&#9655;';

  if(a === 'play'){
    newEventBus.trigger('pressedPlay');
    playBt.setAttribute('class', 'stop');
    playBt.innerHTML = '&#8741;';
  }

  if(a === 'stop'){
    playBt.setAttribute('class', 'play');
    playBt.innerHTML = '&#9655;';
    newEventBus.trigger('pressedStop');
    newEventBus.off('theSpeedFieldIsChangedDuringOperation');
  }
});
