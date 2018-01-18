'use strict';
let gamePlace = document.querySelector('#game_show');
let xPlace = 400;
let yPlace = 400;
let xArrPlace = Math.floor(xPlace / 40);
let yArrPlace = Math.floor(yPlace / 40);
let mas = [];
let showElemIsOne = '1';
let showElemIsNull = '0'
let count = 0;
let setIntervalKEY = 0;
let sec = 100;

addStartArr(xArrPlace,yArrPlace);
gamePlace.innerHTML = `<pre>${showGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;

gamePlace.addEventListener('click',(event)=>{
    let x = event.offsetX;
    let y = event.offsetY;

    x = Math.floor( x * xArrPlace / xPlace);
    y = Math.floor( y * yArrPlace / yPlace);

    if(mas[y][x] === 1){
        mas[y][x] = 0;
    } else {
        mas[y][x] = 1;
    }
    gamePlace.innerHTML = `<pre>${showGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;
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
})

newEventBus.on('изменено поле по speed', (secValue)=>{
  sec = secValue;
  clearInterval(setIntervalKEY);
})

function a (sec) {
  return setInterval(()=>{
    startLife(xArrPlace,yArrPlace);
    gamePlace.innerHTML = `<pre>${showGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;
  }, sec);
}

newEventBus.on('нажата stop', ()=>{
  clearInterval(setIntervalKEY)
})

newEventBus.on('изменено поле по Y', (numberY)=>{

  addStartArr(xArrPlace,Math.floor(numberY / 40));
  gamePlace.innerHTML = `<pre>${showGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;
})

newEventBus.on('изменено поле по X', (numberX)=>{
  addStartArr(Math.floor(numberX / 40),yArrPlace);
  gamePlace.innerHTML = `<pre>${showGameWithText(mas, showElemIsOne, showElemIsNull)}</pre>`;
})

function addStartArr(width, height) {
    for(let i = 0; i < width; i++){
        mas[i] = [];
        for (let j=0; j < height; j++){
            mas[i][j] = 0;
        }
    }
}

function showGameWithText(mas, showElemIsOne, showElemIsNull ) {
    let element = '';
    mas.forEach((yArr)=>{
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
  for(let i = 0; i < width; i++){
    mas2[i] = [];
    for (let j=0; j < height; j++){
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
  showGameWithText(mas, showElemIsOne, showElemIsNull);
  count++;
}
