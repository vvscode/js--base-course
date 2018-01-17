'use strict';
let gamePlace = document.querySelector('#game_show');
let widthPlace = 20;
let heightPlace = 20;
let mas = [];
let showElemIsOne = '1';
let showElemIsNull = '0';
let count = 0;

goLife(widthPlace,heightPlace);
gamePlace.innerHTML = `<pre>${showGame(mas, showElemIsOne, showElemIsNull)}</pre>`;

gamePlace.addEventListener('click',(event)=>{
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x/20);
    y = Math.floor(y/20);

    if(mas[y][x] === 1){
        mas[y][x] = 0;
    } else {
        mas[y][x] = 1;
    }
    gamePlace.innerHTML = `<pre>${showGame(mas, showElemIsOne, showElemIsNull)}</pre>`;
});



function goLife(width,height) {
    for(let i = 0; i < width; i++){
        mas[i] = [];
        for (let j=0; j < height; j++){
            mas[i][j] = 0;
        }
    }
}

function showGame(mas, showElemIsOne, showElemIsNull ) {
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
function startLife(width,height) {
    let mas2 = [];
    for(let i = 0; i < width; i++){
        mas2[i] = [];
        for (let j=0; j < height; j++){
            let neighbors = 0;
            if(mas[a(i-1)][j] === 1) neighbors++; // up
            if(mas[b(i+1, height)][j] === 1) neighbors++; // down
            if(mas[i][a(j-1)] === 1) neighbors++; // left
            if(mas[i][b(j+1, width)] === 1) neighbors++; // right

            if(mas[a(i-1)][a(j-1)] === 1) neighbors++; // up/left
            if(mas[a(i-1)][b(j+1, width)] === 1) neighbors++; // up/right
            if(mas[b(i+1,height) ][a(j-1)] === 1) neighbors++; // down/left
            if(mas[b(i+1, height)][b(j+1, width)] === 1) neighbors++; // down/right

            (neighbors === 2 || neighbors === 3) ? mas2[i][j] = 1 : mas[i][j] = 0;
        }
    }
    mas = mas2;
    showGame(mas, showElemIsOne, showElemIsNull);
    count++;


}


function a(i) {
    if(i === -1 ){
        return 0;
    }
}

function b(i, param) {
    if ( i === param + 1 ){
        return param;
    }
}



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
    startLife(widthPlace,heightPlace);
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