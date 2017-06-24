var FIELD_WIDTH = 600;
var FIELD_HEIGHT = 300;

class Player {
  constructor(ctx, width, height, color, x, y) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;

    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;

    this.x = x;
    this.y = y;
  }

  update(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
    return this;
  }

  newPos(options) {
    this.moveAngle = 0;
    this.speed = 0;
    options.left && (this.moveAngle = -5);
    options.right && (this.moveAngle = 5);
    options.up && (this.speed = 5);
    options.down && (this.speed = -5);

    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);

    if (this.x > FIELD_WIDTH) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = FIELD_WIDTH;
    }
    if (this.y > FIELD_HEIGHT) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = FIELD_HEIGHT;
    }
    return this;
  }
}

export default Player;
