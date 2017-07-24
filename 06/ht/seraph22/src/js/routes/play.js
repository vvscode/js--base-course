export default class Play
{
	constructor(game)
	{
		this.name = 'play';
		this.match = 'play';

		this.game = game;
	}

	onEnter()
	{
		if (!this.game.playerName)
		{
			window.location.hash = '';
		}
		else
		{
			this.game.startGame();
		}
	}
};