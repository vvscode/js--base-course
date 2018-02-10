'use strict';
let xPlace = 800;
let yPlace = 400;
let mas = [];
let history = new Map();
let count = 0;
let setIntervalKEY = 0;
let sec = 1000;
let x = '',
    y = '';

startPlace ();

function startPlace () {
  addStartArr( xA(xPlace),xA(yPlace));
  showGameWithText (mas);
}

newEventBus.on('setUpTheInitialFigures', (event)=>{
  if(!history['1']) {
    if(event){
      x = event.offsetX;
      y = event.offsetY;

      x = Math.floor( x * xA(xPlace) / xPlace);
      y = Math.floor( y * xA(yPlace) / yPlace);

      if(mas[y][x] === 1){
        mas[y][x] = 0;
      } else {
        mas[y][x] = 1;
      }
    }
  }
  else {
    mas = history[count];
    deleteHistoryArr (count, history);
    if(event){
      x = event.offsetX;
      y = event.offsetY;

      x = Math.floor( x * xA(xPlace) / xPlace);
      y = Math.floor( y * xA(yPlace) / yPlace);

      if(mas[y][x] === 1){
        mas[y][x] = 0;
      } else {
        mas[y][x] = 1;
      }
    }
  }
  showGameWithText (mas);
});

newEventBus.on('pressedPlay', ()=>{
  if(!history['1']){
    clearInterval(setIntervalKEY);
    setIntervalKEY = a (sec);
    newEventBus.on('theSpeedFieldIsChangedDuringOperation', (secValue)=>{
      sec = secValue;
      clearInterval(setIntervalKEY);
      setIntervalKEY = a (sec);
    })
  } else {
    mas = history[count];
    deleteHistoryArr (count, history);
    clearInterval(setIntervalKEY);
    setIntervalKEY = a (sec);
    newEventBus.on('theSpeedFieldIsChangedDuringOperation', (secValue)=>{
      sec = secValue;
      clearInterval(setIntervalKEY);
      setIntervalKEY = a (sec);
    })
  }
});

newEventBus.on('goBackOneStep', ()=>{
  --count;
  saveStepsGame (history[count], count);
});

newEventBus.on('goOneStepFurther', ()=>{
  ++count;
  saveStepsGame (history[count], count);
});

newEventBus.on('changedFieldBySpeed', (secValue)=>{
  sec = secValue;
  clearInterval(setIntervalKEY);
});

newEventBus.on('pressedStop', ()=> clearInterval(setIntervalKEY));

newEventBus.on('y_fieldChanged', (numberY)=>{
    yPlace = numberY;
    addStartArr( xA(xPlace),xA(yPlace));
    showGameWithText (mas);
    newEventBus.trigger('forCanvas', xPlace, yPlace);
});

newEventBus.on('x_fieldChanged', (numberX)=>{
    xPlace = numberX;
    addStartArr( xA(xPlace),xA(yPlace));
    showGameWithText (mas);
    newEventBus.trigger('forCanvas', xPlace, yPlace);

});

function deleteHistoryArr (count, history) {
  for(let key in history){
    if(key > count && history.hasOwnProperty(key)){
      delete history[key]
    }
  }
}

function xA(value) {
    return Math.floor(value / 40);
}

function a (sec) {
  return setInterval(()=>{
    startLife(xA(xPlace),xA(yPlace));
    showGameWithText (mas);
  }, sec);
}

// граничные проверки истории
function saveStepsGame (arr, countV) {
  if(countV === -1) {
    alert('Истории сзади нет!!!');
    count = 0;
    arr = history[count];
    showGameWithText (arr);
  }
  if(history[`${countV}`] === undefined && count > 0){
    alert('Истории впереди нет!!!');
    --count;
    arr = history[count];
    showGameWithText (arr);
  }
  showGameWithText (arr);
}

// Массив готов к отрисовке
function showGameWithText (arr) {
  history[`${count}`] = arr;
  newEventBus.trigger('changedArrayToDisplay', arr);
}

function addStartArr( width, height) {
    mas = [];
    for( let i = 0; i < height; i++){
        mas[i] = [];
        for (let j=0; j < width; j++){
            mas[i][j] = 0;
        }
    }
}

function testStraightValue(num) {
  return num !== -1;
}

function testDiagonalValue(num, param) {
  return num !== param;
}

function startLife(width,height) {
  let mas2 = [];
  for(let i = 0; i < height; i++){
    mas2[i] = [];
    for (let j=0; j < width; j++){
      let neighbors = 0;

// ограничение поля
      if( testStraightValue(i-1) && mas[i-1][j] === 1 ) neighbors++; // up
      if( testDiagonalValue(i+1, height) && mas[i+1][j] === 1 ) neighbors++; // down
      if( testStraightValue(j-1) && mas[i][j-1] === 1 ) neighbors++; // left
      if( testDiagonalValue(j+1, width) && mas[i][j+1] === 1 ) neighbors++; // right

      if( ( testStraightValue(i-1) && testStraightValue(j-1) ) && mas[i-1][j-1] === 1 ) neighbors++; // up/left
      if( ( testStraightValue(i-1) && testDiagonalValue(j+1, width) ) && mas[i-1][j+1] === 1 ) neighbors++; // up/right
      if( ( testDiagonalValue(i+1,height) && testStraightValue(j-1) ) && mas[i+1 ][j-1] === 1 ) neighbors++; // down/left
      if( ( testDiagonalValue(i+1, height) && testDiagonalValue(j+1, width) ) && mas[i+1][j+1] === 1 ) neighbors++; // down/right

// проверка по правилам
      if( mas[i][j] === 0 && neighbors === 3){
        mas2[i][j] = 1
      } else if ( mas[i][j] === 1 && neighbors === 2 || neighbors === 3){
        mas2[i][j] = 1
      } else {
        mas2[i][j] = 0
      }
    }
  }
  count++;
  mas = mas2;
}

