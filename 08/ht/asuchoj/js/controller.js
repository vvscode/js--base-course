'use strict';
let newEventBus = new EventBus();
let preBt = document.querySelector('#pre');
let playBt = document.querySelector('#play');
let nextBt = document.querySelector('#next');
let numberX = document.querySelector('#number_x');
let numberY = document.querySelector('#number_y');
let speed = document.querySelector('#range');

//обработчик на pre
preBt.addEventListener('click',()=>{
   alert('pre')
});

//обработчик на play
playBt.addEventListener('click',()=>{
    alert('play')
});

//обработчик на play
nextBt.addEventListener('click',()=>{
    alert('next')
});

//обработчик на number_x
numberX.addEventListener('change',()=>{
    alert('number_x')
});

//обработчик на number_y
numberY.addEventListener('change',()=>{
    alert('number_y')
});

//обработчик на speed
speed.addEventListener('change',()=>{
    alert('speed')
});