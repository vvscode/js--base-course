import { GameOfLife } from './logic';
import { Field } from './field';
let gameField = document.getElementById('gameField');
let game = new GameOfLife(4, 4);
console.log(game);
let field = new Field(game.field, gameField);
game.nextStep();
console.log(game);
field.drawPlain(game.field, gameField);
