class InitGame {
	constructor() {
		document.body.innerHTML = '';
		this.score = JSON.parse(localStorage.getItem('bestscore')) || ['New user', 0];
		this.screen = document.createElement('div');
		this.screen.className = 'game-wrapper';
		this.screen.innerHTML = '<div class="welcome-screen">\
		<p class="text-h1">Welcome to my Arcade Game</p>\
			<div class="description-block">\
				<img class="image-description" src="img/player.png">\
				<p class="text-description">This is your character. You can move it with keyboard arrows. Your aim is to avoid crossing roads with enemies.</p>\
			</div>\
			<div class="description-block">\
				<p class="text-description">This is your enemy. It appears in a random position and goes in a random direction. When it reaches your character, the game stops.</p>\
				<img class="image-description" src="img/enemy.png">\
			</div>\
			<div class="description-block">\
				<img class="image-description" src="img/follower.png">\
				<p class="text-description">This is another type of enemy. It starts following your character, when close enough. When it reaches your character, the game stops.</p>\
			</div>\
			<div class="description-block">\
				<p class="text-description">Moreover, there will be fruits appearing.\
					<span>\
						<img class="image-description" src="img/pear.png" />\
						<img class="image-description" src="img/apple.png" />\
						<img class="image-description" src="img/orange.png" />\
					</span>\
					If you eat them, one of the enemy will disappear and you will get +10 to score.\
				</p>\
			</div>\
		</div>\
		<div class="results-overlay">\
			<div class="score-block">\
				<div class="text-normal">Best score: <span id="score">' + this.score[1] + '</span></div>\
				<div class="text-normal">Best player: <span id="player">' + this.score[0] + '</span></div>\
			</div>\
			<input class="player-name-input" type="text" placeholder="Enter player name..." autofocus />\
			<div class="buttons-block">\
				<a class="link-style" id="play" href="#play-game">Start game</a>\
			</div>\
		</div>';

		document.body.appendChild(this.screen);

		this.clearLastGame();
		document.querySelector('.player-name-input').addEventListener('change', this.setPlayerName.bind(this));
	}

	clearLastGame() {
		var lastGame = [];
		localStorage.setItem('lastGame', JSON.stringify(lastGame));
	}

	setPlayerName() {
		var playerName = document.querySelector('.player-name-input').value;
		localStorage.setItem('playerName', JSON.stringify(playerName));
	}
}


class PlayGame {
	constructor() {
		document.body.innerHTML = '';
		this.screen = document.createElement('div');
		this.screen.className = 'game-wrapper';
		this.screen.innerHTML = '<div class="canvas"></div>';
		document.body.appendChild(this.screen);

		this.clearLastGame();
		this.start();
	}

	clearLastGame() {
		var lastGame = [];
		localStorage.setItem('lastGame', JSON.stringify(lastGame));
	}

	start() {
		new GameArea();
	}	
}


class ScoreBlock {
	constructor(name, result) {
		this.name = name;
		this.result = result;

		this.block = document.createElement('div');
		this.block.className = 'results-overlay-after';
		this.block.innerHTML = '<div class="score-block">\
			<div class="text-normal">Best score: <span id="score">' + this.result + '</span></div>\
			<div class="text-normal">Best player: <span id="player">' + this.name + '</span></div>\
		</div>\
		<div class="buttons-block">\
			<a class="link-style" id="play" href="#play-game">Start game</a>\
			<a class="link-style" id="replay" href="#replay-game">Replay game</a>\
		</div>';
		document.querySelector('.game-wrapper').appendChild(this.block);
	}
}


class GameArea {
	constructor() {
		this.canvas = document.createElement('canvas'),
		document.querySelector('.canvas').appendChild(this.canvas);
		this.canvas.width = 550;
		this.canvas.height = 550;
		this.context = this.canvas.getContext('2d');
		this.canvas.focus();
		this.frameNumber = 0;
		this.interval = setInterval(this.update.bind(this), 20);
		this.enemy = [];
		this.follower = [];
		this.apple = [];
		this.playerName = JSON.parse(localStorage.getItem('playerName')) || '';
		this.gameResult = 0;
		this.appleHit = false;
		
		window.addEventListener('keydown', this.movePlayer.bind(this));

		this.myPlayer = new Component(this.randomPositionX(), this.randomPositionY(), 15, 'img/sprite-player.png', 0, 0, 'image', this.canvas);
		this.myLevel = new Component(400, 40, 'bold 14px Lato', '#4f4e4b', 0, 0, 'text');
		this.myScore = new Component(400, 65, 'bold 14px Lato', '#4f4e4b', 0, 0, 'text');
		
		this.score = JSON.parse(localStorage.getItem('bestscore')) || [0, 0];
		this.lastGame = JSON.parse(localStorage.getItem('lastGame')) || [];

		if (window.devicePixelRatio >= 2 || screen.width < 600) {
			new MobileRulers(this.myPlayer);
		}

	}

	randomNumber() { return (Math.random() < 0.5 ? -1 : 1)*(Math.random() * 2);}

	randomPositionX() {return (Math.round(Math.random() * this.canvas.width));}

	randomPositionY() {return (Math.round(Math.random() * this.canvas.height));}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	stop() {
		clearInterval(this.interval);
	}

	setHistoryItem() {
		if (this.gameResult > Number(this.score[1])) {
			this.score[1] = Math.floor(this.gameResult);
			this.score[0] = this.playerName;
			localStorage.setItem('bestscore', JSON.stringify(this.score));
		}
	}

	update() {
		for (var i = 0; i < this.follower.length; i++) {
			if(this.myPlayer.collisionDetected(this.follower[i])) {
				localStorage.setItem('lastGame', JSON.stringify(this.lastGame));
				this.stop();
				this.setHistoryItem();
				new ScoreBlock(this.score[0], this.score[1]);
				return;
			} 
		}
		
		for (var i = 0; i < this.enemy.length; i++) {
			if(this.myPlayer.collisionDetected(this.enemy[i])) {
				localStorage.setItem('lastGame', JSON.stringify(this.lastGame));
				this.stop();
				this.setHistoryItem();
				new ScoreBlock(this.score[0], this.score[1]);
				return;
			} 
		}

		for (var i = 0; i < this.apple.length; i++) {
			if(this.myPlayer.collisionDetected(this.apple[i])) {
				this.apple.splice(i, 1);

				if (this.follower.length > 1) {
					this.follower.splice(Math.floor(Math.random() * this.follower.length), 1);
				}

				if (this.enemy.length > 1) {
					this.enemy.splice(Math.floor(Math.random() * this.enemy.length), 1);
				}
				
				this.gameResult = this.gameResult + 10;

				this.clear();

				var test = false;
				var colorInterval = setInterval(() => {
					if(test === false) {
						this.canvas.style.backgroundColor = '#ffffff';
						test = true;
						return;
					} 

					if (test === true) {
						this.canvas.style.backgroundColor = '#cbd9ef';
						test = false;
						return;
					}
				}, 100);

				var timeout = setTimeout(() => {
					clearInterval(colorInterval);
					this.canvas.style.backgroundColor = '#cbd9ef';
					test = false;
				}, 600);

				return;
			} 
		}

		this.clear();

		this.frameNumber += 1;

		if (this.frameNumber == 1 || this.frameNumber % 300 == 0) {
			this.enemy.push(new Component(this.randomPositionX(), this.randomPositionY(), 15, 'img/sprite-enemy.png', this.randomNumber(), this.randomNumber(), 'image', this.canvas));
			this.follower.push(new Component(this.randomPositionX(), this.randomPositionY(), 15, 'img/sprite-follower.png', this.randomNumber(), this.randomNumber(), 'image', this.canvas));
		}

		if (this.frameNumber % 200 == 0) {
			var source = ['img/apple.png', 'img/pear.png', 'img/orange.png'];
			this.apple.push(new Component(this.randomPositionX(), this.randomPositionY(), 15, source[Math.floor(Math.random() * source.length)], 0, 0, 'static', this.canvas));
		}

		for (var i = 0; i < this.enemy.length; i++) {
			this.enemy[i].newPos();
			this.enemy[i].draw(this.context);
		}

		for (var i = 0; i < this.follower.length; i++) {
			this.follower[i].startFollowing(this.myPlayer);
			this.follower[i].newPos();
			this.follower[i].draw(this.context);
		}

		for (var i = 0; i < this.apple.length; i++) {
			this.apple[i].draw(this.context);
		}

		this.gameResult = this.gameResult + (1/50);
		this.myLevel.text = "LEVEL: " + Math.round(this.frameNumber / 300); 
		this.myLevel.draw(this.context);
		this.myScore.text = "SCORE: " + Math.floor(this.gameResult);
		this.myScore.draw(this.context);
		this.myPlayer.newPos();
		this.myPlayer.draw(this.context);
		
		var frameRecord = [];
		for (var i = 0; i < this.enemy.length; i++) { 
			frameRecord.push([this.enemy[i].args, this.enemy[i].color]);
		}

		for (var i = 0; i < this.follower.length; i++) { 
			frameRecord.push([this.follower[i].args, this.follower[i].color]);
		}

		for (var i = 0; i < this.apple.length; i++) { 
			frameRecord.push([this.apple[i].args, this.apple[i].color]);
		}

		frameRecord.push([this.myPlayer.args, this.myPlayer.color]);
		
		this.lastGame.push(frameRecord);
		
	}

	movePlayer(event) {
		this.myPlayer.speedX = 0;
		this.myPlayer.speedY = 0;

		if (event.keyCode == 37) {
			this.myPlayer.speedX = -4;
		} 

		if (event.keyCode == 39) {
			this.myPlayer.speedX = 4;
		} 

		if (event.keyCode == 38) {
			this.myPlayer.speedY = -4;
		} 

		if (event.keyCode == 40) {
			this.myPlayer.speedY = 4;
		}
	}
}

class MobileRulers {
	constructor(player) {
		this.rulers = document.createElement('div');
		this.rulers.className = 'mobile-rulers';
		this.rulers.innerHTML = '<div class="single">\
			<img id="up" class="ruler" src="img/up.png" />\
		</div>\
		<div class="double">\
			<img id="left" class="ruler" src="img/left.png" />\
			<img id="right" class="ruler" src="img/right.png" />\
		</div>\
		<div class="single">\
			<img id="down" class="ruler" src="img/down.png" />\
		</div>';

		document.querySelector('.game-wrapper').appendChild(this.rulers);	

		this.myPlayer = player;

		document.querySelector('.mobile-rulers').addEventListener('click', this.moveMobile.bind(this));
	}

	moveMobile(event) {
		this.myPlayer.speedX = 0;
		this.myPlayer.speedY = 0;

		if (event.target.id == 'left') {
			this.myPlayer.speedX = -4;
		} 

		if (event.target.id == 'right') {
			this.myPlayer.speedX = 4;
		} 

		if (event.target.id == 'up') {
			this.myPlayer.speedY = -4;
		} 

		if (event.target.id == 'down') {
			this.myPlayer.speedY = 4;
		}
	}
}

class Component {
	constructor(x, y, radius, color, speedX, speedY, type, context) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
		this.radius = radius;
		this.color = color;
		this.type = type;
		this.step = 0;
		this.context = context;

		if (type == 'image' || type == 'static') {
			this.image = new Image();
			this.image.src = color;
		}
	}
	
	draw(ctx) {
		if (this.type == 'text') {
			ctx.font = this.radius;
			ctx.fillStyle = this.color;
			ctx.fillText(this.text, this.x, this.y);
		} 

		else if (this.type == 'image') {
			this.step += 1;
			this.step = this.step % 30;
			var dir = 0;

			if (this.speedX <= 0 && this.speedY <= 0) {
				if (Math.abs(this.speedX) < Math.abs(this.speedY)) {
					dir = 3;
				} else {
					dir = 1;
				}
			}

			if (this.speedX <= 0 && this.speedY >= 0) {
				if (Math.abs(this.speedX) < Math.abs(this.speedY)) {
					dir = 0;
				} else {
					dir = 1;
				}
			}

			if (this.speedX >= 0 && this.speedY <= 0) {
				if (Math.abs(this.speedX) < Math.abs(this.speedY)) {
					dir = 3;
				} else {
					dir = 2;
				}
			}

			if (this.speedX >= 0 && this.speedY >= 0) {
				if (Math.abs(this.speedX) < Math.abs(this.speedY)) {
					dir = 0;
				} else {
					dir = 2;
				}
			}

			if (this.speedX == 0 && this.speedY == 0) {
				dir = 0;
			}

			this.args = [
				this.image.width / 3 * Math.floor(this.step / 10),		
				this.image.height / 4 * dir,							
				this.image.width / 3,									
				this.image.height / 4,	
				this.x - this.radius,	
				this.y - this.radius,	
				this.radius * 2,		
				this.radius * 2
			];		
				

			ctx.drawImage(
				this.image,												// img	Source image
				this.image.width / 3 * Math.floor(this.step / 10),		// sx	Source x
				this.image.height / 4 * dir,							// sy	Source y
				this.image.width / 3,									// sw	Source width
				this.image.height / 4,	// sh	Source height
				this.x - this.radius,	// dx	Destination x
				this.y - this.radius,	// dy	Destination y
				this.radius * 2,		// dw	Destination width
				this.radius * 2			// dh	Destination height
			);
		} 

		else if (this.type == 'static') {
			this.image.width = 30,
			this.image.height = 30,

			this.args = [
				this.x,
				this.y,
				this.image.width,
				this.image.height
			];		
				

			ctx.drawImage(
				this.image,
				this.x - this.radius,
				this.y - this.radius,
				this.image.width,
				this.image.height
			);

		} 

		else {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}
	
	newPos() {
		this.x += this.speedX;
		this.y += this.speedY;
		
		if (this.x > this.context.width) {
			this.x = 0;
		}
		if (this.x < 0) {
			this.x = this.context.width;
		}
		if (this.y > this.context.height) {
			this.y = 0;
		}
		if (this.y < 0) {
			this.y = this.context.height;
		}
	}
	
	collisionDetected(player) {
		var dx = player.x - this.x;
		var dy = player.y - this.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		
		if (distance < this.radius + player.radius) {
			return true;
		} else {
			return false;
		}
	}
	
	startFollowing(player) {
		var dx = player.x - this.x;
		var dy = player.y - this.y;
		var distance = Math.sqrt(dx * dx + dy * dy); //расстояние между объектами
		var angle = Math.atan2(dy, dx); //значение угла между объектами в радианах
		var speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
		
		if (distance < (this.radius + player.radius) * 3) {
			this.speedX = speed * Math.cos(angle);
			this.speedY = speed * Math.sin(angle);
		} 
	}
}

class ReplayArea {
	constructor() {
		this.canvas = document.createElement('canvas'),
		document.querySelector('.canvas').appendChild(this.canvas);
		this.canvas.width = 550;
		this.canvas.height = 550;
		this.context = this.canvas.getContext('2d');
		this.frameNumber = 0;
		this.interval = setInterval(this.update.bind(this), 5);
		this.count = 0;
		this.lastGame = JSON.parse(localStorage.getItem('lastGame')) || [];
	
	}

	update() {
		this.clear();

		if (this.lastGame[this.count] === undefined) {
			this.stop();
			return;
		}

		for (var i = 0; i < this.lastGame[this.count].length; i++) {
			this.image = new Image();
			this.image.src = this.lastGame[this.count][i][1];
			this.lastGame[this.count][i][0].unshift(this.image);
			this.context.drawImage(...this.lastGame[this.count][i][0]);
		}		

		this.count = this.count + 1;
	}
	

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	stop() {
		clearInterval(this.interval);
	}
}

class ReplayScreen {
	constructor() {
		document.body.innerHTML = '';
		this.screen = document.createElement('div');
		this.screen.className = 'game-wrapper';
		this.screen.innerHTML = '<div class="canvas"></div>';
		document.body.appendChild(this.screen);
		this.score = JSON.parse(localStorage.getItem('bestscore')) || [0, 0];
		this.start();
	}

	start() {
		new ReplayArea();
		new ScoreBlock(this.score[0], this.score[1]);
	}		
}


var router = new Router({
  routes: [{
    name: 'index',
    match: '',
    onEnter: () => new InitGame()
  }, {
    name: 'play-game',
    match: (text) => text === 'play-game',
    onEnter: () => new PlayGame()
  }, {
    name: 'replay-game',
    match: (text) => text === 'replay-game',
    onEnter: () => new ReplayScreen()
  }]
});