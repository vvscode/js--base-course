class Menu {
  constructor(element) {
    this.element = element;
  }

  renderMenu() {
    const menuBlock = document.querySelector(this.element);

    menuBlock.outerHTML = `
      <div class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    `
  }
}

export default Menu;
