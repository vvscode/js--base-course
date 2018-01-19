//функция для отображения игры текстом
let showElemIsOne = 'Х';
let showElemIsNull = '.';

newEventBus.on('изменился массив для отображения', (arr)=>{
    gamePlace.innerHTML = `<pre>${addGameWithText(arr, showElemIsOne, showElemIsNull)}</pre>`;
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


