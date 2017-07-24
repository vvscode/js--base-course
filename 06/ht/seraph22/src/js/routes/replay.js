export default class Replay
{
	constructor(replayGame, eventBus)
	{
		this.name = 'replay';
		this.match = 'replay';

		this.replayGame = replayGame;
		this.eventBus = eventBus;
	}

	onEnter()
	{
		this.replayGame.bestReplay();
	}
};