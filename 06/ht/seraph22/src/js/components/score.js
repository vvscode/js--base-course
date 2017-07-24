export default class Score
{
	constructor(posX, posY, color)
	{
		this.posX = posX;
		this.posY = posY;
		this.color = color;

		this.index = 1;
	}

	draw(ctx)
	{
		ctx.font = 'bold 20px Calibri';
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, this.posX, this.posY);
	}
}