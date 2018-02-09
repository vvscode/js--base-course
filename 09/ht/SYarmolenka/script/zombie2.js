import {Person} from "./person";
import {sprite} from "./script";

export class Zombie2 extends Person {
  constructor (...args) {
    super(...args);
    this.name = `zombie2`;
    this.oldSpeed = this.speed;
    this.zone = 25;
    this.zombieActionZone = 150;
    this.width = sprite[this.name].spriteWidth;
    this.height = sprite[this.name].spriteHeight;
  }
  check (hero, cb) {
    let offsetX = (this.x + this.width / 2) - (hero.x + hero.width / 2);
    let offsetY = (this.y + this.height / 2) - (hero.y + hero.height / 2);
    if (Math.sqrt(Math.abs(offsetX) * Math.abs(offsetX) + Math.abs(offsetY) * Math.abs(offsetY)) < this.zombieActionZone && !this.turbo) {
      this.turbo = true;
      this.corner = this.getCornerByPoints(this.x + this.width / 2, hero.x + hero.width / 2, this.y + this.height / 2, hero.y + hero.height / 2);
      this.speed = hero.speed * 0.75;
    } else {
      this.turbo = false;
      this.speed = this.oldSpeed;
    }

    if (Math.abs(offsetX) < this.zone && Math.abs(offsetY) < this.zone) {
      hero.forse ? this.delete = true : cb();
    }
  };
  getCornerByPoints (x1, x2, y1, y2) {
    let corner;
    let dX = x1 - x2;
    let dY = y1 - y2;
    let atg = Math.abs(Math.atan(dY / dX) * 180 / Math.PI);
    if (dX <= 0 && dY >= 0) corner = atg;
    if (dX > 0 && dY >= 0) corner = 180 - atg;
    if (dX >= 0 && dY < 0) corner = 180 + atg;
    if (dX < 0 && dY < 0) corner = 360 - atg;
    return corner;
  };
};
