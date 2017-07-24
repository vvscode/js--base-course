export default class Results
{
	constructor(game)
	{
		this.name = 'results';
		this.match = 'results';

		this.game = game;

		this.container = document.querySelector('.container');
		this.canvas = document.querySelector('canvas');
	}

	onBeforeEnter()
	{
		if (!this.game.playerName)
		{
			window.location.hash = '';
		}
	}

	onEnter()
	{
		this.scoreObj = JSON.parse(localStorage.getItem('score')) || {};

		let div = document.createElement('div');
		div.className = 'results-container';
		div.innerHTML = `
            <div class="results">
                <h1>The Revenant 1.0.1</h1>
                <h2>Best players:</h2>
            </div>

			<div class="play-again-button" id="play">Play again</div>
			<div class="replay-button" id="replay">Replay best game</div>
		`;

		this.container.insertBefore(div, this.canvas);

		this.resultsContainer = document.querySelector('.results-container');

		this.playButton = document.querySelector('.play-again-button');
		this.playButton.addEventListener('click', () => window.location.hash = 'play');

		this.replayButton = document.querySelector('.replay-button');
		this.replayButton.addEventListener('click', () => window.location.hash = 'replay');

		this.results = document.querySelector('.results');

		if (Object.keys(this.scoreObj).length > 0)
		{
			for (let i in this.scoreObj)
			{
				let name = i;
				let num;
				let split;
				if (name.indexOf('#') >= 0)
				{
					split = name.split('#');
					num = split[0];
					name = split[1];
				}

				let p = document.createElement('p');
				p.innerHTML = `${num}. ${name} : ${this.scoreObj[i]}`;
				this.results.appendChild(p);
			}
		}
	}

	onLeave()
	{
		this.container.removeChild(this.resultsContainer);
	}
};