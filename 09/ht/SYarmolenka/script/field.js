import {sprite} from "./script";

export class Field {
  constructor () {
    this.createCanvas();
    this.buttonStyle();
  };
  createCanvas () {
    this.main = document.querySelector(`main`);
    this.main.innerHTML = `
    <canvas id="field"></canvas>
    <div id="buttons">
      <div class="mobile up"></div>
      <div class="mobile down"></div>
      <div class="mobile left"></div>
      <div class="mobile right"></div>
    </div>
    `;
    this.canvas = document.getElementById(`field`);
    this.ctx = this.canvas.getContext(`2d`);
    this.buttons = document.getElementById(`buttons`);
    this.resize();
    this.events();
  };
  refresh () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  buttonStyle () {
    this.blocks = document.querySelectorAll(`.mobile`);
    this.blocks.forEach(div => {
      if (div.classList.contains(`up`)) {
        div.style.top = `0`;
        div.style.left = this.width * 0.3 + `px`; // 30%
        div.style.height = this.height / 2 + `px`;
        div.style.width = this.width * 0.4 + `px`; // 40%
      };
      if (div.classList.contains(`down`)) {
        div.style.top = this.height / 2 + `px`;
        div.style.left = this.width * 0.3 + `px`; // 30%
        div.style.height = this.height / 2 + `px`;
        div.style.width = this.width * 0.4 + `px`; // 40%
      }
      if (div.classList.contains(`left`)) {
        div.style.top = `0`;
        div.style.left = `0`;
        div.style.height = this.height + `px`;
        div.style.width = this.width * 0.3 + `px`; // 30%
      }
      if (div.classList.contains(`right`)) {
        div.style.top = `0`;
        div.style.left = this.width * 0.7 + `px`; // 70%
        div.style.height = this.height + `px`;
        div.style.width = this.width * 0.3 + `px`; // 30%
      }
    });
  };
  draw (person, tick) {
    let arr = sprite.coords(person.name, person.direction, tick);
    if (person.name !== `zombie2`) {
      this.ctx.drawImage(...arr, Math.round(person.x), Math.round(person.y), arr[3], arr[4]);
    } else {
      this.ctx.fillStyle = `rgba(255,255,255,0.1)`;
      this.ctx.beginPath();
      this.ctx.moveTo(person.x + person.width / 2 + person.zombieActionZone, person.y + person.height / 2);
      this.ctx.arc(person.x + person.width / 2, person.y + person.height / 2, person.zombieActionZone, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.drawImage(...arr, Math.round(person.x), Math.round(person.y), arr[3], arr[4]);
    };
  }
  forseIndicate (value) {
    if (!value) {
      let div = document.createElement(`div`);
      div.id = `indicate`;
      this.main.appendChild(div);
      div.style.top = this.height - 20 + `px`;
    } else {
      let div = document.querySelector(`#indicate`);
      div.style.background = `-webkit-linear-gradient(left, #f00 0%, #f00 ${100 - value}%, rgba(255, 0, 0, 0) ${100 - value}%, rgba(255, 0, 0, 0) 100%)`;
    }
  }
  resize () {
    this.width = this.canvas.width = document.documentElement.clientWidth;
    this.height = this.canvas.height = document.documentElement.clientHeight;
  };
  events () {
    window.addEventListener(`resize`, this.resize.bind(this));
  };
};
