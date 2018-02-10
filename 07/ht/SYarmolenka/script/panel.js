import {lifeGame, eb} from "./router";
import {Slider} from "./slider";
import {Input} from "./input";
import {Control} from "./control";

class ControlPanel {
  constructor () {
    this.elem = document.createElement(`footer`);
    this.prevElem = document.querySelector(`main`);
  };
  create () {
    if (!this.prevElem) return;
    let createBlock = () => {
      let div = document.createElement(`div`);
      div.className = `block`;
      this.elem.appendChild(div);
      return div;
    };

    new Control(createBlock());
    new Slider(createBlock());
    new Input(createBlock());

    document.body.appendChild(this.elem);
  };
  delete () {
    this.elem.innerHTML = ``;
    document.body.removeChild(this.elem);
  }
}
export {ControlPanel};
