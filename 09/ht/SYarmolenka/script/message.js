import {result} from "./script"

export class Message {
  constructor (time) {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.time = time;
    this.create();
  }
  create () {
    this.div = document.createElement(`div`);
    this.div.id = `cover`;
    this.div.innerHTML = `
      <div id="message">
        <p id="time">Your time: ${this.time / 1000} s</p>
        <input id="username" type="text">
        <div>
          <button>OK</button>
          <button>Cancel</button>
        </div>
      </div>
    `;
    this.div.classList.add(`z2`);
    document.body.appendChild(this.div);
    this.div.style.top = 0;
    this.div.style.left = 0;
    this.div.style.height = this.height + `px`;
    this.div.style.width = this.width + `px`;
    let message = this.div.querySelector(`#message`);
    let coords = message.getBoundingClientRect();
    message.style.top = (this.height / 2 - coords.height / 2) + `px`;
    message.style.left = (this.width / 2 - coords.width / 2) + `px`;
    this.events();
  }
  events () {
    this.input = this.div.querySelector(`#username`);
    this.div.addEventListener(`click`, e => {
      if (!e.target.matches(`button`)) return;
      if (e.target.innerText === `OK`) {
        if (this.input.value === ``) return;
        result.newResult({name: this.input.value, time: this.time});
      };
      if (e.target.innerText === `Cancel`) window.location.hash = `history`;
      this.delete();
    });
    this.input.addEventListener(`keypress`, e => {
      if (e.keyCode !== 13 || this.input.value === ``) return;
      if (this.input.value === ``) return;
      result.newResult({name: this.input.value, time: this.time});
      this.delete();
    });
  };
  delete () {
    this.div.parentNode.removeChild(this.div);
  };
};
