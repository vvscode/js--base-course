var FIELD_WIDTH = window.innerWidth * 0.8;
var FIELD_HEIGHT = 600;

class Player {
  constructor(ctx, width, height, color, x, y, eventBus) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;

    this.eventBus = eventBus;

    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;

    this.image = document.querySelector('.animal-turtle');

    this.hasPower = false;

    this.x = x;
    this.y = y;
  }

  power() {
    // this.color = 'rgb(244, 139, 139)';
    if (this.hasPower) return;
    this.height += 10;
    this.width += 10;
    this.speed += 10;

    this.eventBus.trigger('game:logger', ['You have power for 10 sec!', 'bonus']);

    setTimeout(() => {
      this.eventBus.trigger('game:logger', ['3 seconds and power will gone', 'bonus']);
    }, 1000*7);

    this.hasPower = true;
    setTimeout(() => {
      this.hasPower = false;
      this.color = 'orange';
      this.height -= 10;
      this.width -= 10;
      this.speed -= 10;


    }, 10000);
  }

  update(ctx) {


    // ctx.save();
    //
    // ctx.translate(this.x, this.y);

    // // ctx.rotate(this.angle);
    // // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, 10, 10);
    // ctx.restore();

    ctx.save();
    ctx.translate(this.x, this.y);
    // ctx.rotate(this.angle);
    ctx.rotate(this.angle - Math.PI / 2);
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.width, this.height, this.width, this.height);
    if (this.hasPower) {
      ctx.drawImage(document.querySelector('.animal-turtle-2'), this.width / -2 + 10, this.height / -2 + 10, this.width, this.height);
    } else {
      ctx.drawImage(this.image, this.width / -2 + 10, this.height / -2 + 10, this.width, this.height);

    }
    ctx.restore();


    return this;
  }

  newPos(options) {
    this.moveAngle = 0;
    if (this.hasPower) {
      this.speed = 5;
    } else {
      this.speed = 0;
    }
    options.left && (this.moveAngle = -5);
    options.right && (this.moveAngle = 5);
    options.up && (this.speed += 5);
    options.down && (this.speed += -5);



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
