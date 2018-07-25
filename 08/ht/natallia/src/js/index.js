import EventBus from './utils/EventBus';
import Router from './utils/router';
import drawPageAbout from './about/about';
import GetMatrixGame from './matrix/matrix';
import TextField from './textField/textField';
import CanvasField from './canvasField/canvasField';
import SvgField from './svgField/svgField';

export const eventBus = new EventBus();
const about = document.querySelector('#about');
const controls = document.querySelector('#controls');
const fieldCont = document.querySelector('#game-field');
var state = { count: 1 };
var game = new GetMatrixGame({
  state: state,
  controlsCont: controls,
  fieldCont: fieldCont
});

document.querySelector('#new-game').addEventListener('click', _ => {
  document.querySelector('#btn-play').innerHTML =
    '<img id="play" src="img/play.png" class="controls__img">';
  state = game.drawNewField();
  state[1] = state[state.count];
  state.count = 1;
  eventBus.trigger('controls: stopGame');
});

eventBus.on('drawPageAbout', drawPageAbout);

let router = new Router({
  routes: [
    {
      name: 'About',
      match: '',
      onBeforeEnter: () => {
        controls.classList.add('hide');
        about.classList.remove('hide');
        eventBus.trigger('controls: stopGame');
      },

      onEnter: () => {
        eventBus.trigger('drawPageAbout', about);
      },

      onLeave: () => {
        about.innerHTML = '';
        controls.classList.remove('hide');
      }
    },

    {
      name: 'text',
      match: 'text',
			onBeforeEnter: () => {
				about.classList.add('hide');
			},

      onEnter: () => {
        new TextField(state, fieldCont);
      },

      onLeave: () => {
        fieldCont.innerHTML = '';
        eventBus.off('field: drawGameField');
      }
    },

    {
      name: 'canvas',
      match: 'canvas',
			onBeforeEnter: () => {
				about.classList.add('hide');
			},

      onEnter: () => {
        new CanvasField(state, fieldCont);
      },

      onLeave: () => {
        fieldCont.innerHTML = '';
        eventBus.off('field: drawGameField');
      }
    },

    {
      name: 'SVG',
      match: 'svg',
			onBeforeEnter: () => {
				about.classList.add('hide');
			},

      onEnter: () => {
        new SvgField(state, fieldCont);
      },

      onLeave: () => {
        fieldCont.innerHTML = '';
        eventBus.off('field: drawGameField');
      }
    }
  ]
});
