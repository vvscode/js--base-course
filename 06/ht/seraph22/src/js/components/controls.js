export default class Controls
{
	constructor(eventBus)
	{
		this.eventBus = eventBus;
		this.eventBus.on('controls', this.run.bind(this));
	}

	run([self, event])
	{
		self.player.speedX = 0;
		self.player.speedY = 0;

		if (event.keyCode === 37)
		{
			self.player.speedX = -3.5;
		}

		if (event.keyCode === 39)
		{
			self.player.speedX = 3.5;
		}

		if (event.keyCode === 38)
		{
			self.player.speedY = -3.5;
		}

		if (event.keyCode === 40)
		{
			self.player.speedY = 3.5;
		}
	}
}