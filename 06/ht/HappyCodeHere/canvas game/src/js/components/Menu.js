class Menu {
  constructor(element) {
    this.element = element;
  }

  renderMenu() {
    this.element.innerHTML = `
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#game">Game</a></li>
        <li><a href="#stats">Statistics</a></li>
      </ul>
    `
  }
}

export default Menu;
