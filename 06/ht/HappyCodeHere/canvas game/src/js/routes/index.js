const index = {
  name: 'index',
  match: '/',
  onEnter() {
    const mainBlock = document.querySelector('.main');

    mainBlock.innerHTML = `
      <h2>Hello, welcome to game!</h2>
    `
  }
}

export { index };
