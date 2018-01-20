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
newEventBus.on('рисуем', (arr, page)=>{

// для остановки игры при переходе на about
  if( page2 === 'about' && ( page === 'text' || page === 'canvas' || page === 'svg' )){
    alert('нажата play');
    newEventBus.trigger('нажата play')
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
    gamePlace.innerHTML = `<svg id="svg">${drawSVG (arr)}</svg>`;
  }

  if(page === 'about'){
      page2 = page;
      newEventBus.trigger('нажата stop');
      alert('нажата stop');
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
newEventBus.on('для canvas', (val1, val2)=>{
  Promise.resolve()
      .then(()=>{
          width = val1;
          height = val2;
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


