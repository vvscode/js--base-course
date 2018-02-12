export class Person {
  constructor (x, y, corner, speed, tick) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.corner = corner;
    this.speed = speed;
    this.tick = tick;
    this.delete = false;
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.direction = `down`;
    this.writeHistory();
  };
  step () {
    if (this.delete) {
      this.x = -200;
      this.y = -200;
      this.writeHistory();
      return;
    }
    let dx = this.speed * Math.cos(this.corner * Math.PI / 180);
    let dy = -1 * this.speed * Math.sin(this.corner * Math.PI / 180);
    this.x += dx;
    this.y += dy;
    if (this.x > this.screenWidth) this.x = 0 - this.size;
    if (this.y > this.screenHeight) this.y = 0 - this.size;
    if (this.x + this.size < 0) this.x = this.screenWidth;
    if (this.y + this.size < 0) this.y = this.screenHeight;
    this.defineDirection();
    this.writeHistory();
  };
  play () {
    let step = this.replay[0];
    this.x = step.x;
    this.y = step.y;
    this.corner = step.corner;
    this.defineDirection();
    this.replay.shift();
  }
  defineDirection () {
    this.corner = Math.abs(this.corner);
    if (this.corner > 360) this.corner = this.corner % 360;
    if ((this.corner >= 0 && this.corner < 45) || (this.corner >= 315 && this.corner <= 360)) this.direction = `right`;
    if (this.corner >= 135 && this.corner < 225) this.direction = `left`;
    if (this.corner >= 45 && this.corner < 135) this.direction = `up`;
    if (this.corner >= 225 && this.corner < 315) this.direction = `down`;
  };
  writeHistory () {
    if (!this.history) this.history = [];
    this.history.push({x: this.x, y: this.y, corner: this.corner, speed: this.speed});
  };
};
