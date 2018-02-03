class Field {
  constructor (width, height) {
    if (width > 0 && height > 0) {
      this.static = 1;
      this.width = width;
      this.height = height;
    }
    this.x0 = this.y0 = 0;
    this.createMain();
  };
  createMain () {
    this.main = document.createElement(`main`);
    document.body.appendChild(this.main);
    this.main.innerHTML = `<canvas id="field"></canvas>`;
    this.canvas = document.getElementById(`field`);
    this.ctx = this.canvas.getContext(`2d`);
    if (this.static) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    } else {
      this.resize();
      this.events();
    };
  };
  createMobileButtons () {
    let arr = [`up`, `down`, `left`, `right`];
    for (let i = 0; i < 4; i++) {
      let div = document.createElement(`div`);
      div.classList.add(`mobile`);
      div.classList.add(arr[i]);
      this.main.appendChild(div);
    }
    this.blocks = document.querySelectorAll(`.mobile`);

    this.blocks.forEach(div => {
      if (div.classList.contains(`up`)) {
        div.style.top = `50px`;
        div.style.left = this.width * 0.3 + `px`;
        div.style.height = (this.height - 50) / 2 + `px`;
        div.style.width = this.width * 0.4 + `px`;
      };
      if (div.classList.contains(`down`)) {
        div.style.top = (this.height - 50) / 2 + 50 + `px`;
        div.style.left = this.width * 0.3 + `px`;
        div.style.height = (this.height - 50) / 2 + `px`;
        div.style.width = this.width * 0.4 + `px`;
      }
      if (div.classList.contains(`left`)) {
        div.style.top = `0`;
        div.style.left = `0`;
        div.style.height = this.height + `px`;
        div.style.width = this.width * 0.3 + `px`;
      }
      if (div.classList.contains(`right`)) {
        div.style.top = `0`;
        div.style.left = this.width * 0.7 + `px`;
        div.style.height = this.height + `px`;
        div.style.width = this.width * 0.3 + `px`;
      }
    });
  };
  resize () {
    this.width = this.canvas.width = document.documentElement.clientWidth;
    this.height = this.canvas.height = document.documentElement.clientHeight;
    if (this.blocks && this.blocks.length > 0) {
      this.blocks.forEach(div => div.parentNode.removeChild(div));
      this.createMobileButtons();
    };
  };
  events () {
    window.addEventListener(`resize`, this.resize.bind(this));
  };
  delete () {
    this.main.parentNode.removeChild(this.main);
  }
}

export {Field};
