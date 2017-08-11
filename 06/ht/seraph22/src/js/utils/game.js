import Person from '../components/person';
import Score from '../components/score';

export default class Game
{
	constructor(arena, eventBus)
	{
		this.arena = arena;
		this.eventBus = eventBus;

		// Player
		this.player = {};

		// Score
		this.scoreObj = JSON.parse(localStorage.getItem('score')) || {};
		//this.scoreObj = {};

		// Подписываемся на изменения имени игрока
		this.eventBus.on('playerName', (name) => {this.playerName = name;});
	}

	startGame()
	{
		this.player = new Person(
			[4,4],
			400,
			300,
			25,
			0,
			0,
			'img/knightrider.png',
			this.arena,
			'player'
		);

		this.level = new Score(20, 30, '#7bff60');
		this.score = new Score(20, 52, '#fff12d');

		window.addEventListener('keydown', (event) =>
		{
			event.preventDefault();
			this.eventBus.trigger('controls', [this, event])
		});

		// Объект, в который записывается игра
		this.saveGame = {};

		// Обнуляем счетчик очков
		this.scoreCount = 0;

		// Запускаем арену
		this.arena.startArena();

		// Запускаем игру
		this.interval = setInterval(this.updateGame.bind(this), 20);
	}

	updateGame()
	{
		// Проверка на game over
		this.checkGameOver(this.arena.dumbEnemy);
		this.checkGameOver(this.arena.smartEnemy);

		// Очищаем канвас арены
		this.arena.clearArena();

		// Добавляем очки
		this.scoreCount += 1;

		// Устанавливаем картинку на бэкграунд
		if (this.scoreCount === 1 || this.scoreCount % 600 === 0)
		{
			this.arena.setNewGround();
		}

		// Добавить тупого врага
		if (this.scoreCount === 1 || this.scoreCount % 300 === 0)
		{
			if (this.arena.dumbEnemySpriteNum === 9)
			{
				this.arena.dumbEnemySpriteNum = 1;
			}

			this.arena.dumbEnemy.push(new Person(
				[3,4],
				this.randomNumCanvas(this.arena.canvas.width),
				this.randomNumCanvas(this.arena.canvas.height),
				22,
				this.randomNumber(),
				this.randomNumber(),
				'img/dumbEnemy/wolf' + this.arena.dumbEnemySpriteNum + '.png',
				this.arena,
				'dumbEnemy_' + this.arena.dumbEnemyCount
			));

			this.arena.dumbEnemyCount++;
			this.arena.dumbEnemySpriteNum++;
		}

		// Добавить умного врага
		if (this.scoreCount % 600 === 0)
		{
			if (this.arena.smartEnemySpriteNum === 9)
			{
				this.arena.smartEnemySpriteNum = 1;
			}

			this.arena.smartEnemy.push(new Person(
				[3,4],
				this.randomNumCanvas(this.arena.canvas.width),
				this.randomNumCanvas(this.arena.canvas.height),
				22,
				this.randomNumber(),
				this.randomNumber(),
				'img/smartEnemy/bearcat' + this.arena.smartEnemySpriteNum + '.png',
				this.arena,
				'smartEnemy_' + this.arena.smartEnemyCount
			));

			this.arena.smartEnemyCount++;
			this.arena.smartEnemySpriteNum++;
		}

		// Отрисовка новой позиции
		this.player.updatePos();
		// Сохранение текущей позиции(для реплея)
		this.saveCurrentPos(this.player);
		// Отрисовка текущей позиции
		this.player.draw(this.arena.context);

		for (let i = 0; i < this.arena.dumbEnemy.length; i++)
		{
			this.arena.dumbEnemy[i].updatePos();
			this.saveCurrentPos(this.arena.dumbEnemy[i]);
			this.arena.dumbEnemy[i].draw(this.arena.context);
		}

		for (let i = 0; i < this.arena.smartEnemy.length; i++)
		{
			this.arena.smartEnemy[i].catchUp(this.player);
			this.arena.smartEnemy[i].updatePos();
			this.saveCurrentPos(this.arena.smartEnemy[i]);
			this.arena.smartEnemy[i].draw(this.arena.context);
		}

		// Повысить уровень
		if (this.scoreCount % 600 === 0)
		{
			this.level.index++;
		}

		// Выводим уровень и счет на экран
		this.level.text = `LEVEL    ${this.level.index}`;
		this.level.draw(this.arena.context);
		this.score.text = `SCORE   ${this.currentScore}`;
		this.score.draw(this.arena.context);

		// Количество очков
		this.currentScore = +(Math.round(this.scoreCount / 25) + '0');
	}

	checkGameOver(enemy)
	{
		for (let i = 0; i < enemy.length; i++)
		{
			if (this.player.checkIntersection(enemy[i]))
			{
				// Остановить игру
				this.stopGame();
				// Сохранить счет
				this.saveScore();

				// Перейти на страницу с рекордами
				window.location.hash = 'results';

				return;
			}
		}
	}

	stopGame()
	{
		clearInterval(this.interval);
	}

	saveScore()
	{
		let tempObj = {};

		if (Object.keys(this.scoreObj).length > 0)
		{
			// Нужна для того, чтобы не перезаписывались все результаты, которые ниже текущего
			let check = true;
			// Перезаписывает все номера, ниже текущего результата
			let addNum = 0;
			for (let i in this.scoreObj)
			{
				let split = i.split('#');
				let iNum = +split[0];
				let iName = split[1];

				if (check && this.currentScore > this.scoreObj[i])
				{
					// Сохраняем реплей для первого места
					if (iNum === 1)
					{
						localStorage.setItem('saveGame', JSON.stringify(this.saveGame));
					}

					addNum = 1;
					tempObj[iNum + '#' + this.playerName] = this.currentScore;
					tempObj[addNum + iNum + '#' + iName] = this.scoreObj[i];
					check = false;
				}
				else
				{
					tempObj[addNum + iNum + '#' + iName] = this.scoreObj[i];
				}
			}

			this.scoreObj = Object.assign(tempObj, {});

			if (Object.keys(this.scoreObj).length > 10)
			{
				delete this.scoreObj[Object.keys(this.scoreObj)[10]];
			}
		}
		else
		{
			this.scoreObj['1#' + this.playerName] = this.currentScore;
			// Сохраняем реплей для первого места
			localStorage.setItem('saveGame', JSON.stringify(this.saveGame));
		}

		localStorage.setItem('score', JSON.stringify(this.scoreObj));

		//console.log('tempObj ' + JSON.stringify(tempObj,'',4));
		//console.log('scoreObj ' + JSON.stringify(this.scoreObj,'',4));
	}

	saveCurrentPos(person)
	{
		if (!this.saveGame[person.type])
		{
			this.saveGame[person.type] = {
				posX:[person.startPosX],
				posY:[person.startPosY],
				speedX:[person.speedX],
				speedY:[person.speedY]
			};
		}
		else
		{
			let arrX = this.saveGame[person.type].posX;
			arrX.push(person.startPosX);
			this.saveGame[person.type].posX = arrX;

			let arrY = this.saveGame[person.type].posY;
			arrY.push(person.startPosY);
			this.saveGame[person.type].posY = arrY;

			let speedX = this.saveGame[person.type].speedX;
			speedX.push(person.speedX);
			this.saveGame[person.type].speedX = speedX;

			let speedY = this.saveGame[person.type].speedY;
			speedY.push(person.speedY);
			this.saveGame[person.type].speedY = speedY;
		}
	}

	randomNumber()
	{
		return (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2.5);
	}

	randomNumCanvas(value)
	{
		let random = Math.random();
		if (random <= .25 || random >= .75)
		{
			return Math.round(random * value)
		}
		else if (random >= .5)
		{
			return (Math.round((random + .25) * value));
		}
		return (Math.round((random - .25) * value));
	}
}