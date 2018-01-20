//функция для отображения игры текстом
let showElemIsOne = 'Х';
let showElemIsNull = '.';
let gameBox = document.querySelector('.main_game_life')

newEventBus.on('рисуем', (arr, page)=>{
console.log(page);
  if(page === 'text'){
    gamePlace.innerHTML = `<pre>${addGameWithText(arr, showElemIsOne, showElemIsNull)}</pre>`;
  } else if( page === 'canvas'){
    gamePlace.innerHTML = '<canvas id="canvas"></canvas>';
    let canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    drawCanvas (arr, ctx)
  } else if(page === 'svg'){
    gamePlace.innerHTML = `<svg id="svg">${drawSVG (arr)}</svg>`;
  } else if(page === 'about'){
    alert('about')
  }

});

//функция для отображения игры text
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

//функция для отображения игры canvas
function drawCanvas (arr, elem) {
  arr.forEach((yArr, i) => {
    yArr.forEach((xArr, j) => {
      if (xArr === 0) {
        elem.fillRect(j * 15, i * 15, 15, 15)
      }
    });
  });
}

//функция для отображения игры svg
function drawSVG (arr, x,y) {
  console.log('svg');
/*  let element = '';

  arr.forEach((yArr)=>{
    yArr.forEach((xArr)=>{
      if(xArr === 1){
        element += '<rect width="30" height="30" class="svg-square"></rect>' ;
      }
    });
    element += '\n';
  });
  return element;*/
}
