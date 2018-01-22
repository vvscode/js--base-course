import {Life, session} from "./main.js";
import {EventBus} from "./eb";
import {Header} from "./header";
import {Text} from "./text";
import {Canvas} from "./canvas";
import {Svg} from "./svg";
import {ControlPanel} from "./panel";

let lifeGame = new Life();
let eb = new EventBus();
export {lifeGame, eb};

new Header();
let main = document.createElement(`main`);
main.id = `field`;
document.body.appendChild(main);
let controlPanel = new ControlPanel(document.querySelector(`footer`));

let route = {
  routes: [],
  interpret: function (hash) {
    let result;
    this.routes.forEach(function (iroute) {
      if (typeof iroute.match === `string` && iroute.match === hash) {
        result = iroute;
      }
      if (typeof iroute.match === `object` && iroute.match instanceof RegExp && hash.match(iroute.match) !== null) {
        iroute.param = hash.match(iroute.match);
        result = iroute;
      }
      if (typeof iroute.match === `function` && iroute.match(hash)) {
        route.param = hash;
        result = iroute;
      }
    });

    return result;
  },
  start: function () {
    window.addEventListener(`hashchange`, function (e) {
      let oldHash = e.oldURL.match(/#(.+)/);
      let newHash = e.newURL.match(/#(.+)/);
      if (oldHash !== null) { oldHash = oldHash[1]; } else { oldHash = ``; };
      if (newHash !== null) { newHash = newHash[1]; } else { newHash = ``; };
      route.change(oldHash, newHash);
    });
    this.change(``, window.location.hash.slice(1));
  },
  change: function (oldHash, newHash) {
    let iroute = route.interpret(oldHash);
    if (!iroute) {
      console.error(`interpret(oldHash) не нашёл route!`);
      iroute = route.interpret(``);
    };
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    }
    iroute = route.interpret(newHash);
    if (!iroute) {
      console.error(`interpret(newHash) не нашёл route!`);
      iroute = route.interpret(``);
    };
    this.position = newHash;
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  }
};

let text, renderText, canvas, refreshCanvas, renderCanvas, svg, refreshSvg, renderSvg;
let readStorage = (cb) => {
  if (lifeGame.currentArr && lifeGame.currentArr.length > 0) {
    cb(lifeGame.currentArr);
    return;
  };
  Promise.all([session(`lastArray`), session(`field`)]).then(arr => {
    if (arr[0] !== undefined && arr[1] !== undefined) {
      lifeGame.currentArr = arr[0];
      lifeGame.x = +arr[1][0];
      lifeGame.y = +arr[1][1];
      cb(lifeGame.currentArr);
    };
  });
};

let checkLinks = () => {
  if (route.position === ``);
  let links = document.querySelectorAll(`.route`);
  links.forEach(elem => {
    elem.classList.remove(`press`);
    if (elem.innerText === route.position) {
      elem.classList.add(`press`);
    }
  });
};

route.routes = [
  {
    name: `index`,
    match: function (hash) { return hash === ``; },
    onEnter: function () {
      main.innerText = `
        Выберите режим отображения игры ('Text', 'Canvas' или 'SVG')
        `;
    },
    onLeave: function () {
      main.innerHTML = ``;
    }
  },
  {
    name: `text`,
    match: `Text`,
    onEnter () {
      checkLinks();
      text = new Text(main);
      text.create();
      renderText = text.render.bind(text);
      readStorage(renderText);
      eb.on(`changeArr`, renderText);
      controlPanel.create();
    },
    onLeave: function () {
      text.clear();
      eb.off(`changeArr`, renderText);
      text = null;
      controlPanel.delete();
    }
  },
  {
    name: `canvas`,
    match: `Canvas`,
    onEnter: function (arr) {
      checkLinks();
      canvas = new Canvas(main, 20);
      canvas.refresh();
      refreshCanvas = canvas.refresh.bind(canvas);
      renderCanvas = canvas.render.bind(canvas);
      readStorage(arr => { refreshCanvas(); renderCanvas(arr); });
      eb.on(`createField`, refreshCanvas);
      eb.on(`changeArr`, renderCanvas);
      controlPanel.create();
    },
    onLeave: function () {
      eb.off(`createField`, refreshCanvas);
      eb.off(`changeArr`, renderCanvas);
      canvas = null;
      controlPanel.delete();
    }
  },
  {
    name: `svg`,
    match: `SVG`,
    onEnter: function () {
      checkLinks();
      svg = new Svg(main, 20);
      svg.refresh();
      refreshSvg = svg.refresh.bind(svg);
      renderSvg = svg.render.bind(svg);
      readStorage(arr => { refreshSvg(); renderSvg(arr); });
      eb.on(`createField`, refreshSvg);
      eb.on(`changeArr`, renderSvg);
      controlPanel.create();
    },
    onLeave: function () {
      eb.off(`createField`, refreshSvg);
      eb.off(`changeArr`, renderSvg);
      svg = null;
      controlPanel.delete();
    }
  },
  {
    name: `about`,
    match: `About`,
    onEnter: function () {
      checkLinks();
      main.innerHTML = `
        <p>Данное веб-приложение - реализация игры "Жизнь".</p>
        <p>Описание и правила игры вы можете посмотреть в википедии.</p>
        <a target="_blank" href="https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB"><img src="other/wiki.png" alt=""></a>
        <p class="about">В верхней части приложения - панель переключения по режимам отображения игры ("Text","Canvas","SVG"), а также вкладка "About", которую вы сейчас читаете.</p>
        <p class="about">Центральная часть - поле игры, "кликая" по которому зарождается/угасает "жизнь".</p>
        <p class="about">В режимах игры, в нижней части приложения, отображается: слева - панель управления игрой: кнопки "Play" и "Pause" для запуска и остановки игры, кнопки перехода по истории игры "вперед/назад" (работают только в режиме "Pause"); в центре - "ползунок" регулировки скорости игры; справа - окно ввода для создания поля игры.</p>`;
      lifeGame.stop();
    },
    onLeave: function () {
      main.innerHTML = ``;
      // lifeGame.start();
    }
  }
];

route.start();
