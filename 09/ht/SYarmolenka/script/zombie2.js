import {game, field, hero} from "./route";
import {getCornerByPoints} from "./script";
import {Person} from "./person";

class Zombie2 extends Person {
  constructor (args) {
    super(...args);
    this.width = 40;
    this.height = 56;
    this.oldSpeed = this.speed;
    this.name = `zombie2`;
    this.image.src = `./other/zombie2.png`;
    this.image.onload = _ => field.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    this.draw();
    if (!this.replay) {
      let obj = {x: Math.round(this.x), y: Math.round(this.y), corner: this.corner, speed: this.speed};
      Promise.resolve(obj).then(obj => this.history.push(obj));
    }
  }
  draw (corner) {
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    if (corner < 0) corner = Math.abs(corner);
    if (corner > 360) corner = corner % 360;
    if ((corner >= 0 && corner < 45) || (corner >= 315 && corner <= 360)) field.ctx.drawImage(this.image, this.count * 40, 112, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 135 && corner < 225) field.ctx.drawImage(this.image, this.count * 40, 56, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 45 && corner < 135) field.ctx.drawImage(this.image, this.count * 40, 0, this.width, this.height, x, y, this.width, this.height);
    if (corner >= 225 && corner < 315) field.ctx.drawImage(this.image, this.count * 40, 168, this.width, this.height, x, y, this.width, this.height);
    this.count++;
    if (this.count >= 4) this.count = 0;
    field.ctx.fillStyle = `rgba(255,255,255,0.05)`;
    field.ctx.beginPath();
    field.ctx.moveTo(this.x + this.width / 2 + game.zombieActionZone, this.y + this.height / 2);
    field.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, game.zombieActionZone, 0, Math.PI * 2, true);
    field.ctx.fill();
    field.ctx.closePath();
  }
  step () {
    super.step();
    let offsetX = (this.x + this.width / 2) - (hero.x + hero.width / 2);
    let offsetY = (this.y + this.height / 2) - (hero.y + hero.height / 2);
    if (Math.sqrt(Math.abs(offsetX) * Math.abs(offsetX) + Math.abs(offsetY) * Math.abs(offsetY)) < game.zombieActionZone && !this.turbo) {
      this.turbo = true;
      this.corner = 360 - getCornerByPoints(this.x + this.width / 2, hero.x + hero.width / 2, this.y + this.height / 2, hero.y + hero.height / 2);
      this.speed = game.zombieTurboSpeed;
    } else {
      this.turbo = false;
      this.speed = this.oldSpeed;
    }
    if (game.play !== `replay` && Math.abs(offsetX) < 20 && Math.abs(offsetY) < 20) game.stop();
  };
}
export {Zombie2};
