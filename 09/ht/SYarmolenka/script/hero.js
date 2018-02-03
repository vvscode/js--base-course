import {Person} from "./person";
import {field, game} from "./route";

class Hero extends Person {
  constructor (args) {
    super(...args);
    this.height = this.width = 64;
    this.name = `hero`;
    this.image.src = `./other/hero.png`;
    this.image.onload = _ => field.ctx.drawImage(this.image, 0, 128, 64, 64, this.x, this.y, this.width, this.height);
    if (!this.replay) {
      field.createMobileButtons();
      this.events();
      game.allObject.push(this);
    } else {
      game.allReplayObject.push(this);
    }
  };
  draw (corner) {
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    if (corner < 0) corner = Math.abs(corner);
    if (corner > 360) corner = corner % 360;
    if ((corner >= 0 && corner < 45) || (corner >= 315 && corner <= 360)) field.ctx.drawImage(this.image, this.count * 64, 192, 64, 64, x, y, this.width, this.height);
    if (corner >= 135 && corner < 225) field.ctx.drawImage(this.image, this.count * 64, 64, 64, 64, x, y, this.width, this.height);
    if (corner >= 45 && corner < 135) field.ctx.drawImage(this.image, this.count * 64, 128, 64, 64, x, y, this.width, this.height);
    if (corner >= 225 && corner < 315) field.ctx.drawImage(this.image, this.count * 64, 0, 64, 64, x, y, this.width, this.height);
    this.count++;
    if (this.count >= 9) this.count = 0;
    if (!this.replay) {
      let obj = {x: Math.round(this.x), y: Math.round(this.y), corner: this.corner, speed: this.speed};
      Promise.resolve(obj).then(obj => this.history.push(obj));
    }
  };
  events () {
    document.addEventListener(`keydown`, e => {
      if (e.keyCode < 37 && e.keyCode > 40) return;
      let corner = Math.abs(this.corner % 360);
      if (e.keyCode === 39) {
        if (corner > 22.5 && corner < 360 - 22.5) {
          this.corner += 22.5;
        } else { this.corner = 0; };
      }; // right
      if (e.keyCode === 37) {
        if (corner < 180 + 22.5 && corner > 180 - 22.5) {
          this.corner = 180;
        } else { this.corner -= 25; };
      }; // left
      if (e.keyCode === 38) this.corner = 270; // down
      if (e.keyCode === 40) this.corner = 90; // up
    });
    field.main.addEventListener(`mousedown`, e => {
      if (!e.target.classList.contains(`mobile`)) return;
      e.preventDefault();
      let corner = Math.abs(this.corner % 360);
      if (e.target.classList.contains(`right`)) {
        if (corner > 22.5 && corner < 360 - 22.5) {
          this.corner += 22.5;
        } else { this.corner = 0; };
      };;
      if (e.target.classList.contains(`left`)) {
        if (corner < 180 + 22.5 && corner > 180 - 22.5) {
          this.corner = 180;
        } else { this.corner -= 25; };
      };;
      if (e.target.classList.contains(`up`)) this.corner = 270;
      if (e.target.classList.contains(`down`)) this.corner = 90;
    });
  };
}

export {Hero};
