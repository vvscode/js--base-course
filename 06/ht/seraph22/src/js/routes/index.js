export default class Index
{
	constructor(eventBus)
	{
		this.eventBus = eventBus;
		this.name = 'index';
		this.match = '';

		this.container = document.querySelector('.container');
		this.container.innerHTML = `
			<div class="main">
                <div class="description">
                	<h1>The Revenant 1.0.1</h1>
                    <p>Once upon a time there were two friends and one enemy. That enemy was the mean scary dragon. That terrorised all the land’s people. One of the friends was the kind and pretty princess. Everyone liked her. Her name was Sapphire. She was very loving and caring. The other friend was the brave and skilful knight. He was always there for princess Sapphire. The enemy was the mean scary dragon. His name was Flame. He was very fierce. The knight’s name was Arthur. When Sapphire was just about to get some pretty flowers for Arthur, the big scary dragon Flame stood right in front of scared Princess Sapphire, and took her as a prisoner. Arthur heard that news and ran as fast as he could, carrying his sword in one hand. Eventually, he came to the dark where Arthur met a wise and very old oak tree. The old oak tree was ten million thousand years old; he could tell you anything that you want to know. Arthur asked the very old oak tree where he could find Princess Sapphire. The old oak tree said, ‘I believe that she was taken prisoner by the evil dragon Flame. You will find her in a very very cold and damp and dark cave that has his greatest treasures in it, including the ones that he stole.’ Arthur said, ‘Thank you very much’, and he set off to find Princess Sapphire...</p>
                </div>
            </div>
            
            <div class="play-button" id="play">Start jorney</div>
            <div class="warning-player-name hidden">You should enter player name first</div>
            <input class="player-name" type="text" placeholder="Enter player name..." autofocus>
		`;

		this.main = document.querySelector('.main');
		this.playButton = document.querySelector('.play-button');
		this.warning = document.querySelector('.warning-player-name');
		this.inputPlayerName = document.querySelector('.player-name');
	}

	onEnter()
	{
		this.playButton.addEventListener('click', () =>
		{
			if (this.inputPlayerName.value)
			{
				this.eventBus.trigger('playerName', this.inputPlayerName.value);
				window.location.hash = 'play';
			}
			else
			{
				this.warning.classList.remove('hidden');
			}
		});
	}

	onLeave()
	{
		this.container.removeChild(this.main);
		this.container.removeChild(this.playButton);
		this.container.removeChild(this.warning);
		this.container.removeChild(this.inputPlayerName);
	}
};