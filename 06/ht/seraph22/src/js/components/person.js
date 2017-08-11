export default class Person
{
	constructor(spriteSize, startPosX, startPosY, radius, speedX, speedY, src, arena, type, frame)
	{

		this.spriteSize = spriteSize;
		this.startPosX = startPosX;
		this.startPosY = startPosY;
		this.radius = radius;
		this.speedX = speedX;
		this.speedY = speedY;
		this.arena = arena;
		this.type = type;
		this.frame = frame || 0; // Нужен для реплея

		this.step = 0;

		this.image = new Image();
		this.image.src = src;
	}

	draw(ctx)
	{
		this.step += 1;
		this.step = this.step % 30;
		let spriteDirection = 0;

		if (this.speedX <= 0 && this.speedY <= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 3;
			}
			else
			{
				spriteDirection = 1;
			}
		}

		if (this.speedX <= 0 && this.speedY >= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 0;
			}
			else
			{
				spriteDirection = 1;
			}
		}

		if (this.speedX >= 0 && this.speedY <= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 3;
			}
			else
			{
				spriteDirection = 2;
			}
		}

		if (this.speedX >= 0 && this.speedY >= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 0;
			}
			else
			{
				spriteDirection = 2;
			}
		}

		if (this.speedX === 0 && this.speedY === 0)
		{
			spriteDirection = 0;
		}

		ctx.drawImage(
			this.image,												                // img	Source image
			this.image.width / this.spriteSize[0] * Math.floor(this.step / 10),		// sx	Source x
			this.image.height / this.spriteSize[1] * spriteDirection,				// sy	Source y
			this.image.width / this.spriteSize[0],									// sw	Source width
			this.image.height / this.spriteSize[1],	                                // sh	Source height
			this.startPosX - this.radius,                                           // dx	Destination x
			this.startPosY - this.radius,                                           // dy	Destination y
			this.radius * 2.1,		                                                // dw	Destination width
			this.radius * 2.1			                                            // dh	Destination height
		);
	}

	updatePos()
	{
		this.startPosX += this.speedX;
		this.startPosY += this.speedY;

		if (this.startPosX > this.arena.canvas.width)
		{
			if (this.type === 'player')
			{
				this.startPosX = 0;
			}
			else
			{
				this.speedX = -this.speedX;
			}
		}

		if (this.startPosX < 0)
		{
			if (this.type === 'player')
			{
				this.startPosX = this.arena.canvas.width;
			}
			else
			{
				this.speedX = -this.speedX;
			}
		}

		if (this.startPosY > this.arena.canvas.height)
		{
			if (this.type === 'player')
			{
				this.startPosY = 0;
			}
			else
			{
				this.speedY = -this.speedY;
			}
		}

		if (this.startPosY < 0)
		{
			if (this.type === 'player')
			{
				this.startPosY = this.arena.canvas.height;
			}
			else
			{
				this.speedY = -this.speedY;
			}
		}
	}

	drawReplay(ctx, posX, posY, speedX, speedY)
	{
		this.startPosX = posX;
		this.startPosY = posY;
		this.speedX = speedX;
		this.speedY = speedY;

		this.step += 1;

		this.step = this.step % 30;
		let spriteDirection = 0;

		if (this.speedX <= 0 && this.speedY <= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 3;
			}
			else
			{
				spriteDirection = 1;
			}
		}

		if (this.speedX <= 0 && this.speedY >= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 0;
			}
			else
			{
				spriteDirection = 1;
			}
		}

		if (this.speedX >= 0 && this.speedY <= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 3;
			}
			else
			{
				spriteDirection = 2;
			}
		}

		if (this.speedX >= 0 && this.speedY >= 0)
		{
			if (Math.abs(this.speedX) < Math.abs(this.speedY))
			{
				spriteDirection = 0;
			}
			else
			{
				spriteDirection = 2;
			}
		}

		if (this.speedX === 0 && this.speedY === 0)
		{
			spriteDirection = 0;
		}

		ctx.drawImage(
			this.image,												                // img	Source image
			this.image.width / this.spriteSize[0] * Math.floor(this.step / 10),		// sx	Source x
			this.image.height / this.spriteSize[1] * spriteDirection,				// sy	Source y
			this.image.width / this.spriteSize[0],									// sw	Source width
			this.image.height / this.spriteSize[1],	                                // sh	Source height
			this.startPosX - this.radius,                                           // dx	Destination x
			this.startPosY - this.radius,                                           // dy	Destination y
			this.radius * 2.1,		                                                // dw	Destination width
			this.radius * 2.1			                                            // dh	Destination height
		);
	}

	checkIntersection(enemy)
	{
		let dx = enemy.startPosX - this.startPosX;
		let dy = enemy.startPosY - this.startPosY;
		let distance = Math.sqrt(dx * dx + dy * dy);

		return distance < this.radius + enemy.radius;
	}

	catchUp(enemy)
	{
		let dx = enemy.startPosX - this.startPosX;
		let dy = enemy.startPosY - this.startPosY;
		let distance = Math.sqrt(dx * dx + dy * dy);             // расстояние между объектами
		let angle = Math.atan2(dy, dx);                          // угол между объектами в радианах
		let speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);

		if (distance < (this.radius + enemy.radius) * 3)
		{
			this.speedX = speed * Math.cos(angle);
			this.speedY = speed * Math.sin(angle);
		}
	}
}