//функция для отображения игры текстом
let showElemIsOne = 'Х';
let showElemIsNull = '.';
let gameBox = document.querySelector('.main_game_life')


newEventBus.on('рисуем', (arr, page)=>{
console.log(page);
  if(page === 'text'){
    gamePlace.innerHTML = `<pre>${addGameWithText(arr, showElemIsOne, showElemIsNull)}</pre>`;
  } else if( page === 'canvas'){
    alert('r')
  } else if(page === 'svg'){
    alert('svg')
  } else if(page === 'about'){
    alert('about')
  }

});

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

//функция для отображения игры svg


