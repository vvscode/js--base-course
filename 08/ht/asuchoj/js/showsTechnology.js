//данные для отображения игры текстом
let showElemIsOne = 'X';
let showElemIsNull = ' ';

// данные для отображения игры canvas
let sqSize = 40;
let width = 800;
let height = 400;

// данные для отображения игры svg
let page2 = '';

//отрисовка
newEventBus.on('draw', (arr, page)=>{

// для остановки игры при переходе на about
  if( page2 === 'about' && ( page === 'text' || page === 'canvas' || page === 'svg' )){
    if(document.querySelector('#play').hasAttribute('game')){
      newEventBus.trigger('pressedPlay')
    }
  }

// когда выбран text
  if(page === 'text'){
    gamePlace.innerHTML = `<pre>${addGameWithText(arr, showElemIsOne, showElemIsNull)}</pre>`;
  }

// когда выбран canvas
  if( page === 'canvas'){
    gamePlace.innerHTML = '<canvas id="canvas"></canvas>';
    let canvas = document.querySelector('#canvas');

    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = getColor ();
    drawCanvas (arr, ctx, sqSize);
  }

// когда выбран svg
  if(page === 'svg'){
    gamePlace.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width=${width} height=${height} id="svg" >${drawSVG (arr, sqSize)}</svg>`;
    let svg = document.querySelector('#svg');
    svg.fill = 'yellow';
  }

  if(page === 'about'){
      page2 = page;
      newEventBus.trigger('pressedStop');
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

//функции для отображения игры canvas
newEventBus.on('forCanvas', (valueWidth, valueHeight)=>{
  Promise.resolve()
      .then(()=>{
          width = valueWidth;
          height = valueHeight;
      });
});

function drawCanvas (arr, elem, sqSize) {
  arr.forEach((yArr, i) => {
    yArr.forEach((xArr, j) => {
      if (xArr === 1) {
        elem.fillRect(j * sqSize, i * sqSize, sqSize, sqSize)
      }
    });
  });
}

function getColor () {
    return '#' + [
        Math.floor(Math.random() * 255).toString(16),
        Math.floor(Math.random() * 255).toString(16),
        Math.floor(Math.random() * 255).toString(16),
    ].join('');
}

//функция для отображения игры svg
function drawSVG (arr, sqSize) {
  let element = '';
  for(let i = 0; i < arr.length; i++ ){
    for(let j = 0; j < arr[i].length; j++ ){
      if(arr[i][j] === 1){
        let x = j * sqSize;
        let y = i * sqSize;
        element += `<rect x = ${x}  y = ${y} width='40' height='40' class="svg-square" fill = 'yellow'></rect>` ;
      }
    }
    element += '\n';
  }
  return element;
}


