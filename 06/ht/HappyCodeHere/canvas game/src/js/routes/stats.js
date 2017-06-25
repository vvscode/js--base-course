import { loadFromStorage } from '../utils/helpers';

const stats = {
  name: 'stats',
  match: 'stats',
  onEnter() {
    const mainBlock = document.querySelector('.main');

    const data = loadFromStorage(localStorage);




    mainBlock.innerHTML = `
      <h2>Your stats here</h2>
    `

    for (var i = 0; i < data.length; i++) {
      mainBlock.innerHTML += `<p>${data[i]}</p>`
    }

  }
};

export { stats };
