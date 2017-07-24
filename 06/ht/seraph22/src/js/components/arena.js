export default class Arena
{
	constructor()
	{
		this.canvas = document.createElement('canvas');
		this.canvas.width = 798;
		this.canvas.height = 598;
		this.context = this.canvas.getContext('2d');

		this.container = document.querySelector('.container');
		this.container.appendChild(this.canvas);
	}

	startArena()
	{
		this.dumbEnemy = [];
		this.dumbEnemyCount = 1;
		this.dumbEnemySpriteNum = 1;

		this.smartEnemy = [];
		this.smartEnemyCount = 1;
		this.smartEnemySpriteNum = 1;

		this.backgroundCount = 1;
	}

	clearArena()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	setNewGround()
	{
		if (this.backgroundCount === 9)
		{
			this.backgroundCount = 1;
		}

		this.canvas.style.backgroundImage = 'url(../../img/background/ground0' + this.backgroundCount + '.jpg)';
		this.backgroundCount++;
	}
}