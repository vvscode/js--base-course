import { loadFromStorage, deleteFromStorage } from '../utils/helpers';

import Statistics from '../components/Statistics';

const stats = {
  name: 'stats',
  match: 'stats',
  onEnter(url, eventBus) {
    const mainBlock = document.querySelector('.main');
    mainBlock.classList.remove('game', 'welcome');
    mainBlock.classList.add('statistics');

    mainBlock.innerHTML = `
      <h2>Games statistics</h2>
    `

    const statsUl = document.createElement('ul');
    new Statistics(statsUl, eventBus).renderStatistics();

    const storageData = loadFromStorage(localStorage);
    eventBus.trigger('stats:update', storageData);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Clear stats';
    deleteButton.classList.add('btn', 'btn-danger');

    deleteButton.addEventListener('click', () => {
      deleteFromStorage('game-stats', localStorage);
      eventBus.trigger('stats:update', []);
    });

    mainBlock.append(deleteButton, statsUl);
  }
};

export { stats };
