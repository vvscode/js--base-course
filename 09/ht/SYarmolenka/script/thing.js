import {sprite} from "./script";

export class Thing {
  constructor (x, y, tick) {
    this.name = `thing`;
    this.x = x;
    this.y = y;
    this.zone = 20;
    this.tick = tick;
    this.direction = `none`;
    this.delete = false;
    this.width = sprite[this.name].spriteWidth;
    this.height = sprite[this.name].spriteHeight;
  }
  play () {
    let rem = this.replay[0];
    this.x = rem.x;
    this.y = rem.y;
    this.replay.shift();
  }
  step () {
    if (this.delete) {
      this.x = -100;
      this.y = -100;
    }
    this.writeHistory();
  };
  writeHistory () {
    if (!this.history) this.history = [];
    this.history.push({x: this.x, y: this.y});
  };
  check (hero) {
    if (Math.abs((this.x + this.width / 2) - (hero.x + hero.width / 2)) < this.zone && Math.abs((this.y + this.height / 2) - (hero.y + hero.height / 2)) < this.zone) {
      this.delete = true;
      hero.addForce();
    };
  };
};
