class Header {
  constructor() {
    this.create();
  }
  create () {
    let header = document.createElement(`header`);
    header.id = `header`;
    header.innerHTML = `
    <ul id="spa">
      <li><a class="spa" href="#main">Main</a></li>
      <li><a class="spa" href="#game">Game</a></li>
      <li><a class="spa" href="#history">History</a></li>
    </ul>
    `;
    document.body.appendChild(header);
  }
}

export {Header};
