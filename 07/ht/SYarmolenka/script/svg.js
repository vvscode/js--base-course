import {lifeGame} from "./router";

class Svg {
  constructor (where, cell) {
    this.elem = where;
    this.cell = cell || 20;
  };
  create () {
    this.x = this.cell * lifeGame.x || 0;
    this.y = this.cell * lifeGame.y || 0;
    this.elem.innerHTML = `
      <svg id="svg" version="1.1" baseProfile="full" width="${this.x}" height="${this.y}" xmlns="http://www.w3.org/2000/svg">
      </svg>`;
    this.svg = this.elem.querySelector(`#svg`);
  };
  render (arr) {
    let square = (i, j) => {
      let x = j * this.cell;
      let y = i * this.cell;
      this.svg.innerHTML += `<rect x="${x}" y="${y}" width="${this.cell}" height="${this.cell}" fill="red"/>`;
    };
    this.svg.innerHTML = ``;
    arr.forEach((item, i) => {
      item.forEach((elem, j) => {
        if (elem) {
          square(i, j);
        }
      });
    });
  };
  clear () {
    this.elem.innerHTML = ``;
  };
  refresh () {
    this.clear();
    this.create();
  };
};

export {Svg};
