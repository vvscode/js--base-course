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
    let control = new Control(createBlock());
    control.createButtons();
    control.insertButtons(lifeGame.run);
    let insertButtons = control.insertButtons.bind(control);
    eb.on(`play`, insertButtons);

    let slider = new Slider(createBlock());
    slider.create();

    let input = new Input(createBlock());
    input.create();
    
    document.body.appendChild(this.elem);
  };
  delete () {
    this.elem.innerHTML = ``;
    document.body.removeChild(this.elem);
  }
}
export {ControlPanel};
