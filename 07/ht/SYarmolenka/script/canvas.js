import {lifeGame} from "./router";

class Canvas {
  constructor (where, cell) {
    this.elem = where;
    this.cell = cell || 20;
  };
  create () {
    this.x = this.cell * lifeGame.x || 0;
    this.y = this.cell * lifeGame.y || 0;
    this.elem.innerHTML = `<canvas id="canvas" width="${this.x}" height="${this.y}"></canvas>`;
    this.canvas = this.elem.querySelector(`#canvas`);
  }
  render (arr) {
    let can = this.canvas.getContext(`2d`);
    let square = (i, j) => {
      let x = j * this.cell;
      let y = i * this.cell;
      can.fillRect(x, y, this.cell, this.cell);
    };
    can.clearRect(0, 0, this.x, this.y);
    arr.forEach((item, i) => {
      item.forEach((elem, j) => {
        if (elem) {
          can.fillStyle = `rgb(0,0,0)`;
          square(i, j);
        }
      });
    });
  }
  clear () {
    this.elem.innerHTML = ``;
  };
  refresh () {
    this.clear();
    this.create();
  }
}

export {Canvas};
