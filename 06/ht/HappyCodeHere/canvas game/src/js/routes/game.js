import GameField from '../components/GameField';

import Player from '../components/Player';
import Enemy from '../components/Enemy';
import Enemy2 from '../components/Enemy2';
import Bonus from '../components/Bonus';

import PowerLine from '../components/PowerLine';

import Timer from '../components/Timer';
import Logger from '../components/Logger';


import { saveToStorage } from '../utils/helpers';

let gameObj = {};

const game = {
  name: 'game',
  match: 'game',
  onEnter(url, eventBus) {
    const mainBlock = document.querySelector('.main');
    mainBlock.classList.remove('welcome', 'statistics');
    mainBlock.classList.add('game');

    mainBlock.innerHTML = `
      <h2>Game</h2>
    `

    const button = document.createElement('button');
    button.innerText = 'Start game!';
    button.classList.add('btn', 'btn-success');

    button.addEventListener('click', (event) => {
      eventBus.trigger('game:new');
      event.target.classList.add('disabled');


      gameObj = new GameField(canvas, window.innerWidth * 0.8, 600, Player, Enemy, eventBus, Enemy2, Bonus);
    });

    const logger = document.createElement('div');
    logger.classList.add('col-md-2');

    const timer = document.createElement('div');
    timer.classList.add('timer');
    const canvas = document.createElement('canvas');
    canvas.classList.add('col-md-10');

    const powerLine = document.createElement('div');

    new PowerLine(powerLine, eventBus).renderPowerLine();


    const row = document.createElement('div');
    row.classList.add('row');

    logger.append(timer)

    row.append(canvas, logger);

    mainBlock.append(button, powerLine, row);
    new Logger(logger, eventBus).renderLogger();


    new Timer('.timer', eventBus);


    eventBus.on('game:finished', () => {
      button.classList.remove('disabled');
      saveToStorage('some data', localStorage);
    })
  },
  onLeave() {}
};

export { game };
