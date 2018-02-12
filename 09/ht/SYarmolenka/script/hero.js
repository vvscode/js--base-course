import {Person} from "./person";
import {sprite} from "./script";

export class Hero extends Person {
  constructor (...args) {
    super(...args);
    this.name = `hero`;
    this.force = false;
    this.forceTime = 10000;
    this.width = sprite[this.name].spriteWidth;
    this.height = sprite[this.name].spriteHeight;
  };
  addForce () {
    if (!this.forse) {
      this.forse = setTimeout(_ => { this.forse = false; }, this.forceTime);
    } else {
      clearTimeout(this.forse);
      this.forse = setTimeout(_ => { this.forse = false; }, this.forceTime);
    }
    this.stampDate = Date.now();
  };
  check (nothing, cb) {
    if (this.forse) {
      let value = (Date.now() - this.stampDate) / this.forceTime * 100;
      cb(value);
    }
  }
  turn (side) {
    if (side === `right`) {
      if (this.corner < 22.5 || this.corner > 360 - 22.5) {
        this.corner = 0;
      } else if (this.corner <= 180 && this.corner >= 22.5) {
        this.corner -= 22.5;
      } else {
        this.corner += 22.5;
      }
    };
    if (side === `left`) {
      if (this.corner < 180 + 22.5 && this.corner > 180 - 22.5) {
        this.corner = 180;
      } else if (this.corner >= 0 && this.corner < 180 + 22.5) {
        this.corner += 22.5;
      } else {
        this.corner -= 22.5;
      }
    };
    if (side === `up`) {
      if (this.corner < 90 + 22.5 && this.corner > 90 - 22.5) {
        this.corner = 90;
      } else if ((this.corner >= 0 && this.corner <= 90 - 22.5) || (this.corner > 270 && this.corner <= 360)) {
        this.corner += 22.5;
      } else {
        this.corner -= 22.5;
      }
    };
    if (side === `down`) {
      if (this.corner < 270 + 22.5 && this.corner > 270 - 22.5) {
        this.corner = 270;
      } else if ((this.corner >= 0 && this.corner <= 90) || (this.corner >= 270 + 22.5 && this.corner < 360)) {
        this.corner -= 22.5;
      } else {
        this.corner += 22.5;
      }
      if (this.corner < 0) this.corner += 360;
    };
  };
};
