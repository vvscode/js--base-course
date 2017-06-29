/**
 * Created by andre on 29-Jun-17.
 */

function Enemy(ctx, width = 30, height = 30, color = 'red', x = 50, y = 50) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.x1 = Math.floor(Math.random() * 3 + 1);
    this.y1 = Math.floor(Math.random() * 3 + 1);
}
Enemy.prototype = {
    update(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
        return this;
    },
    newPos(width, height){
        this.x += this.x1;
        this.y += this.y1;

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

export default Enemy;