import {Person} from "./person";
import {game, field, hero} from "./route";

class Zombie1 extends Person {
  constructor (args) {
    super(...args);
    this.width = 32;
    this.height = 48;
    this.name = `zombie1`;
    this.image.src = `./other/zombie1.png`;
    this.image.onload = _ => field.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    if (!this.replay) {
      let obj = {x: Math.round(this.x), y: Math.round(this.y), corner: this.corner, speed: this.speed};
      Promise.resolve(obj).then(obj => this.history.push(obj));
    }
  };
  draw (corner) {
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    if (corner < 0) corner = Math.abs(corner);
    if (corner > 360) corner = corner % 360;
    if ((corner >= 0 && corner < 45) || (corner >= 315 && corner <= 360)) field.ctx.drawImage(this.image, this.count * 32, 96, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 135 && corner < 225) field.ctx.drawImage(this.image, this.count * 32, 48, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 45 && corner < 135) field.ctx.drawImage(this.image, this.count * 32, 0, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 225 && corner < 315) field.ctx.drawImage(this.image, this.count * 32, 144, this.width, this.height, x, y, this.width, this.height);
    this.count++;
    if (this.count >= 4) this.count = 0;
  }
  step () {
    super.step();
    if (game.play !== `replay` && Math.abs((this.x + this.width / 2) - (hero.x + hero.width / 2)) < 20 && Math.abs((this.y + this.height / 2) - (hero.y + hero.height / 2)) < 20) game.stop();
  }
}

export {Zombie1};
