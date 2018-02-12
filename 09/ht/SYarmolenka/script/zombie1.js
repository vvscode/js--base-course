import {Person} from "./person";
import {sprite} from "./script";

export class Zombie1 extends Person {
  constructor (...args) {
    super(...args);
    this.name = `zombie1`;
    this.zone = 25;
    this.width = sprite[this.name].spriteWidth;
    this.height = sprite[this.name].spriteHeight;
  };
  check (hero, cb) {
    if (Math.abs((this.x + this.width / 2) - (hero.x + hero.width / 2)) < this.zone && Math.abs((this.y + this.height / 2) - (hero.y + hero.height / 2)) < this.zone) {
      hero.forse ? this.delete = true : cb();
    }
  };
};
