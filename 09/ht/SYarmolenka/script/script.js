import {Field} from "./field";
import {Sprite} from "./sprite";
import {Game} from "./game";
import {Result} from "./winners";
import {Router} from "./router";
import {Table} from "./table";

let router, field, game, table, header, main, sprite, result, promises;

export {field, game, result, sprite, promises};

header = document.querySelector(`header`);
main = document.querySelector(`main`);

promises = [];
result = new Result();
sprite = new Sprite();
sprite.add(`hero`, `./other/hero.png`, 9, 4);
sprite.add(`zombie1`, `./other/zombie1.png`, 9, 4);
sprite.add(`zombie2`, `./other/zombie2.png`, 9, 4);
sprite.add(`thing`, `./other/fruit.png`, 8, 5);

Promise.all(promises).then(_ => {
  router = new Router(route);
  router.start();
});

let route = [
  {
    name: `index`,
    match: function (hash) { return hash === ``; },
    onEnter: function () {
      window.location.hash = `main`;
    }
  },
  {
    name: `main`,
    match: `main`,
    onEnter () {
      main.innerHTML = `
      <div id="describtion">
        <h2>Аркадная игра "ZombieLand"!</h2>
        <p>Web-приложение имеет 3 вкладки:</p>
        <ul>
          <li>описание приложения и правил игры ("Main");</li>
          <li>поле игры ("Game");</li>
          <li>история побед ("History");</li>
        </ul>
        <p>Управление игрой производится с помощью стрелок или нажатие на соответственные стороны сенсорного экрана, при его наличии. При первом нажатии на клавиши управления - происходит старт игры запускается.</p>
        <p>Цель игры - не быть съеденным коварными зомби! При контакте з зомби - игра заканчивается, но на поле игры время от времени появляются фрукты, подбирая которые, Вы легко можете справится с любым зомби, индикатор активности находится в нижней левой части экрана. Для остановки и выхода во время игры можете нажать "ESC". </p>
        <p>При завершении игры - появляется диалоговое окно, требующее Ваше имя, для сохранения результата в историю побед. Также в историю сохраняется лучшая игра, просмотреть которую Вы можете, нажав на кнопку "Play" напротив результата лидера игры.</p>
        <p>Дерзайте! И удачной Вам игры!</p>
      </div>`;
    },
    onLeave: function () {
      main.innerHTML = ``;
    }
  },
  {
    name: `game`,
    match: `game`,
    onEnter: function () {
      field = new Field();
      field.forseIndicate();
      game = new Game(50, 100, 9);
      game.init();
      header.classList.add(`hide`);
    },
    onLeave: function () {
      header.classList.remove(`hide`);
      clearInterval(game.timer);
      main.innerHTML = ``;
      game = null;
      field = null;
    }
  },
  {
    name: `history`,
    match: `history`,
    onEnter: function () {
      table = new Table(result.winners, _ => { window.location.hash = `play`; });
    },
    onLeave: function () {
      table = null;
      main.innerHTML = ``;
    }
  },
  {
    name: `play`,
    match: `play`,
    onEnter: function () {
      field = new Field();
      game = new Game(50, 100, 9);
      result.addSlider(game.interval);
      game.replay();
      header.classList.add(`hide`);
    },
    onLeave: function () {
      header.classList.remove(`hide`);
      clearInterval(game.timer);
      main.innerHTML = ``;
      game = null;
      field = null;
    }
  }
];
