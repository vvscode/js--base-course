import GameArena from '../components/gameArena';
import Player from  '../components/player';
import Enemy from '../components/enemy';

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
            div.innerHTML += `<span class="score"></span><span class="lvl"> Level: 0</span><div><canvas style="border: solid 1px red"></canvas></div>`;
            var canvas = document.querySelector('canvas');
            var score = document.querySelector('span.score');
            var lvl = document.querySelector('span.lvl');
            let timer = new Timer(score);
            let gameArena = new GameArena(canvas, lvl, timer, ARENA_WIDTH, ARENA_HEIGHT, Player, Enemy);
        });
    },
    onLeave: () => div.innerHTML = ''
};

export {game};