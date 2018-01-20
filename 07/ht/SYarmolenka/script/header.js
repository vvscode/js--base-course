class Header {
  constructor () {
    this.elem = document.createElement(`header`);
  };
  create () {
    this.elem.innerHTML = `
      <ul>
        <li>
          <a href="#" class="route">Text</a>
        </li><li>
          <a href="#" class="route">Canvas</a>
        </li><li>
          <a href="#" class="route">SVG</a>
        </li><li>
          <a href="#" class="route">About</a>
        </li>
      </ul>`;
    document.body.appendChild(this.elem);
  };
}

export {Header};
