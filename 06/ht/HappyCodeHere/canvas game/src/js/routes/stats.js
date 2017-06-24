const stats = {
  name: 'stats',
  match: 'stats',
  onEnter() {
    const mainBlock = document.querySelector('.main');

    mainBlock.innerHTML = `
      <h2>Your stats here</h2>
    `
    
  }
};

export { stats };
