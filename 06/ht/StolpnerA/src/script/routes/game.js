import GameArena from '../components/gameArena';
import Player from  '../components/player';

import Timer from '../components/timer';

const ARENA_WIDTH = 700;
const ARENA_HEIGHT = 400;


var div = document.querySelector('div.main');
var game = {
    name: 'game',
    match: (text) => text === 'game',
    onEnter: () => {
        div.innerHTML = `
<h2>Game</h2> <hr>
<button class="start">Start</button>

`;
        let btn = document.querySelector('button.start');
        btn.addEventListener('click', () => {
            div.innerHTML += `<span class="score"></span><div><canvas style="border: solid 1px red"></canvas></div>`;
            var canvas = document.querySelector('canvas');
            var score = document.querySelector('span.score');
            let gameArena = new GameArena(canvas, ARENA_WIDTH, ARENA_HEIGHT, Player);

            let timer = new Timer(score);
        });
    },
    onLeave: () => div.innerHTML = ''
};

export { game };