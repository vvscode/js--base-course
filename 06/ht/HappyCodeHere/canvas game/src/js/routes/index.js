const index = {
  name: 'index',
  match: '',
  onEnter() {
    const mainBlock = document.querySelector('.main');
    mainBlock.classList.remove('game', 'statistics');
    mainBlock.classList.add('welcome');

    mainBlock.innerHTML = `
      <h2>Hello, welcome to game!</h2>
      <a href="#game" class="btn btn-warning">Play!</a>
    `
  }
}

export { index };
