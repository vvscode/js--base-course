import { GameOfLife } from './logic';
import { Field } from './field';
let gameField = document.getElementById('gameField');
let game = new GameOfLife(8, 8);
console.log(game);
let field = new Field(game.field, gameField);

let button = document.getElementById('play');
button.addEventListener('click', () => clearInterval(gameLoop));

function onTimerTick() {
  field.drawPlain(game.field, gameField);
  game.nextStep();
}
let gameLoop = setInterval(onTimerTick, 1000);
