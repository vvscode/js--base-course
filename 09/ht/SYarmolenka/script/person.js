import {game, field, eb} from "./route";

class Person {
  constructor (...args) {
    [this.x,
      this.y,
      this.corner,
      this.speed,
      this.replay] = args;
    this.count = 0;
    this.image = document.createElement(`img`);
    this.history = [];
    this.replay ? eb.on(`tick`, this.play.bind(this)) : eb.on(`tick`, this.step.bind(this));
  };
  step () {
    let dx = this.speed * Math.cos(this.corner * Math.PI / 180);
    let dy = this.speed * Math.sin(this.corner * Math.PI / 180);
    this.x += dx;
    this.y += dy;
    if (this.x >= field.width) this.x = 1 - this.width;
    if (this.y >= field.height) this.y = 1 - this.height;
    if (this.x + this.width <= 0) this.x = field.width - 1;
    if (this.y + this.height <= 0) this.y = field.height - 1;
    this.draw(this.corner);
  };
  play () {
    if (this.history.length === 1) game.stop();
    this.x = this.history[0].x;
    this.y = this.history[0].y;
    this.draw(this.history[0].corner);
    this.history.shift();
  }
}

export {Person};
