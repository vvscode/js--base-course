class Header {
  constructor () {
    this.elem = document.createElement(`header`);
    this.create();
  };
  create () {
    this.elem.innerHTML = `
      <ul>
        <li>
          <a href="#Text" class="route">Text</a>
        </li><li>
          <a href="#Canvas" class="route">Canvas</a>
        </li><li>
          <a href="#SVG" class="route">SVG</a>
        </li><li>
          <a href="#About" class="route">About</a>
        </li>
      </ul>`;
    document.body.appendChild(this.elem);
  };
}

export {Header};
