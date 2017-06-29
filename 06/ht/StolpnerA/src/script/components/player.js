/**
 * Created by andre on 28-Jun-17.
 */
function Player(ctx, width = 30, height = 30, color = 'green', x = 50, y = 50) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
}

Player.prototype = {
    update(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
        return this;
    },
    newPos(option, width, height){
        this.moveAngle = 0;
        this.speed = 0;

        option.left && (this.moveAngle = -5);
        option.right && (this.moveAngle = 5);
        option.up && (this.speed = 5);
        option.down && (this.speed = -5);

        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);

        if (this.y > height){
            this.y = 0;
        } else if (this.y < 0){
            this.y = height;
        } else if (this.x > width){
            this.x = 0;
        } else if (this.x < 0){
            this.x = width;
        }
        return this;
    }
};

export default Player;