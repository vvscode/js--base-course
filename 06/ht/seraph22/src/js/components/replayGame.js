import Person from './person';
import Score from './score';

export default class ReplayGame
{
	constructor(arena)
	{
		this.arena = arena;
		this.replaySpeed = 10; // миллисекунды, чем меньше, тем быстрее реплей
	}

	bestReplay()
	{
		this.frame = 0;
		this.saveGame = JSON.parse(localStorage.getItem('saveGame')) || {};

		if (Object.keys(this.saveGame).length > 0)
		{
			this.player = new Person(
				[4,4],
				this.saveGame['player'].posX[this.frame],
				this.saveGame['player'].posY[this.frame],
				25,
				0,
				0,
				'img/knightrider.png',
				this.arena,
				'player'
			);

			this.level = new Score(20, 30, '#7bff60');
			this.score = new Score(20, 52, '#fff12d');

			// Обнуляем счетчик очков
			this.scoreCount = 0;

			// Запускаем арену
			this.arena.startArena();

			// Запускаем реплей
			this.interval = setInterval(this.updateGame.bind(this), this.replaySpeed);
		}
	}

	updateGame()
	{
		// Останавливаем реплей, если нечего показывать
		if (this.frame >= Object.keys(this.saveGame['player'].posX).length)
		{
			this.stopReplay();
			setTimeout(() => {window.location.hash = 'results'}, 1500);
		}
		else
		{
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
					[3, 4],
					this.saveGame['dumbEnemy_' + this.arena.dumbEnemyCount].posX[this.frame],
					this.saveGame['dumbEnemy_' + this.arena.dumbEnemyCount].posY[this.frame],
					22,
					this.saveGame['dumbEnemy_' + this.arena.dumbEnemyCount].speedX[this.frame],
					this.saveGame['dumbEnemy_' + this.arena.dumbEnemyCount].speedY[this.frame],
					'img/dumbEnemy/wolf' + this.arena.dumbEnemySpriteNum + '.png',
					this.arena,
					'dumbEnemy_' + this.arena.dumbEnemyCount,
					this.frame
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
					[3, 4],
					this.saveGame['smartEnemy_' + this.arena.smartEnemyCount].posX[this.frame],
					this.saveGame['smartEnemy_' + this.arena.smartEnemyCount].posY[this.frame],
					22,
					this.saveGame['smartEnemy_' + this.arena.smartEnemyCount].speedX[this.frame],
					this.saveGame['smartEnemy_' + this.arena.smartEnemyCount].speedY[this.frame],
					'img/smartEnemy/bearcat' + this.arena.smartEnemySpriteNum + '.png',
					this.arena,
					'smartEnemy_' + this.arena.smartEnemyCount,
					this.frame
				));

				this.arena.smartEnemyCount++;
				this.arena.smartEnemySpriteNum++;
			}

			// Отрисовка позиции
			this.player.drawReplay(
				this.arena.context,
				this.saveGame[this.player.type].posX[this.frame],
				this.saveGame[this.player.type].posY[this.frame],
				this.saveGame[this.player.type].speedX[this.frame],
				this.saveGame[this.player.type].speedY[this.frame]
			);

			for (let i = 0; i < this.arena.dumbEnemy.length; i++)
			{
				this.arena.dumbEnemy[i].drawReplay(
					this.arena.context,
					this.saveGame[this.arena.dumbEnemy[i].type].posX[this.frame - this.arena.dumbEnemy[i].frame],
					this.saveGame[this.arena.dumbEnemy[i].type].posY[this.frame - this.arena.dumbEnemy[i].frame],
					this.saveGame[this.arena.dumbEnemy[i].type].speedX[this.frame - this.arena.dumbEnemy[i].frame],
					this.saveGame[this.arena.dumbEnemy[i].type].speedY[this.frame - this.arena.dumbEnemy[i].frame]
				);
			}

			for (let i = 0; i < this.arena.smartEnemy.length; i++)
			{
				this.arena.smartEnemy[i].drawReplay(
					this.arena.context,
					this.saveGame[this.arena.smartEnemy[i].type].posX[this.frame - this.arena.smartEnemy[i].frame],
					this.saveGame[this.arena.smartEnemy[i].type].posY[this.frame - this.arena.smartEnemy[i].frame],
					this.saveGame[this.arena.smartEnemy[i].type].speedX[this.frame - this.arena.smartEnemy[i].frame],
					this.saveGame[this.arena.smartEnemy[i].type].speedY[this.frame - this.arena.smartEnemy[i].frame]
				);
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

			// Следующий кадр
			this.frame++;
		}
	}

	stopReplay()
	{
		clearInterval(this.interval);
	}
};