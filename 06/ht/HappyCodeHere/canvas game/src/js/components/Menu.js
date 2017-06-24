class Menu {
  constructor(element) {
    this.element = element;
  }

  renderMenu() {
    const menuBlock = document.querySelector(this.element);

    menuBlock.innerHTML = `
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#game">Game</a></li>
        <li><a href="#stats">Statictic</a></li>
      </ul>
    `
  }
}

export default Menu;
