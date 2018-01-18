'use strict';
let gamePlace = document.querySelector('#game_show');
let xPlace = 800;
let yPlace = 400;
let mas = [];
let history = new Map();
let showElemIsOne = 'Х';
let showElemIsNull = '.';
let count = 0;
let setIntervalKEY = 0;
let sec = 100;

addStartArr( xA(xPlace),xA(yPlace));
showGameWithText (mas);

gamePlace.addEventListener('click',(event)=>{
    let x = event.offsetX;
    let y = event.offsetY;

    x = Math.floor( x * xA(xPlace) / xPlace);
    y = Math.floor( y * xA(yPlace) / yPlace);

    if(mas[y][x] === 1){
        mas[y][x] = 0;
    } else {
        mas[y][x] = 1;
    }
    gamePlace.innerHTML = `<pre>${addGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;
});

// через EventBus
newEventBus.on('нажата play', ()=>{
  clearInterval(setIntervalKEY);
  setIntervalKEY = a (sec);
  newEventBus.on('изменено поле по speed в процессе работы', (secValue)=>{
    sec = secValue;
    clearInterval(setIntervalKEY);
    setIntervalKEY = a (sec);
  })
});

newEventBus.on('вернуться на шаг назад', ()=>{
  --count;
  saveStepsGame (history[count-1], count - 1);
  mas = history[count-1];
});

newEventBus.on('вернуться на шаг вперед', ()=>{
  ++count;
  saveStepsGame (history[count+1], count + 1);
  mas = history[count+1];
});

newEventBus.on('изменено поле по speed', (secValue)=>{
  sec = secValue;
  clearInterval(setIntervalKEY);
});

newEventBus.on('нажата stop', ()=>{
    clearInterval(setIntervalKEY)
});

newEventBus.on('изменено поле по Y', (numberY)=>{

    yPlace = numberY;
    addStartArr( xA(xPlace),xA(yPlace));
    console.log(yPlace + ' -- это Y');
    showGameWithText (mas);
});

newEventBus.on('изменено поле по X', (numberX)=>{

    xPlace = numberX;
    addStartArr( xA(xPlace),xA(yPlace));
    console.log(xPlace + ' -- это X');
    showGameWithText (mas);
});

function xA(value) {
    return Math.floor(value / 40);
}

function a (sec) {
  return setInterval(()=>{
    showGameWithText (mas);
    startLife(xA(xPlace),xA(yPlace));
    count++;
  }, sec);
}

function saveStepsGame (arr, countV) {

  if(countV === -1) {
    alert('Истории нет!!!');

    showGameWithText (mas);
    arr = mas;
    return count = 1;
  }

  if(history[`${countV}`] === undefined){
    alert('Истории нет!!!');
    return count--;
  }

  if(countV < count){
    showGameWithText (arr);
  }

  if(countV > count){
    showGameWithText (arr);
  }
}

function showGameWithText (arr) {
  gamePlace.innerHTML = `<pre>${addGameWithText(arr, showElemIsOne, showElemIsNull)}</pre>`;
  history[`${count}`] = arr;
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

function addGameWithText(arr, showElemIsOne, showElemIsNull ) {
    let element = '';

    arr.forEach((yArr)=>{
        yArr.forEach((xArr)=>{
            if(xArr === 0){
                element += '' + showElemIsNull;
            } else {
                element += '' + showElemIsOne;
            }
        });
        element += '\n';
    });
    return element;
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
  mas = mas2;
  addGameWithText(mas, showElemIsOne, showElemIsNull);
}

