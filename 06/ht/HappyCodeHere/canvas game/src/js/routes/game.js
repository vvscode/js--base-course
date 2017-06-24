import GameField from '../components/GameField';
import Player from '../components/Player';
import Enemy from '../components/Enemy';

import Timer from '../components/Timer';


import { loadFromStorage, saveToStorage } from '../utils/helpers';

let gameObj = {};

const game = {
  name: 'game',
  match: 'game',
  onEnter(url, eventBus) {
    const mainBlock = document.querySelector('.main');

    mainBlock.innerHTML = `
      <h2>Game</h2>
    `

    let dataFromStorage = loadFromStorage(localStorage);
    console.log(dataFromStorage);

    const button = document.createElement('button');
    button.innerText = 'Start game!';
    button.classList.add('btn', 'btn-danger');

    button.addEventListener('click', (event) => {
      eventBus.trigger('game:new');
      event.target.classList.add('disabled');

      gameObj = new GameField(canvas, 300, 600, Player, Enemy, eventBus);
    })

    const timer = document.createElement('div');
    timer.classList.add('timer');
    const canvas = document.createElement('canvas');
    mainBlock.append(timer, button, canvas);


    new Timer('.timer', eventBus);




    eventBus.on('game:finished', () => {
      button.classList.remove('disabled');
      saveToStorage('some data', localStorage);
    })
  },
  onLeave() {
    gameObj.stop();
  }
};

export { game };
