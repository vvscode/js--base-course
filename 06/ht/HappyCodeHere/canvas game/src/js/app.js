import { index } from './routes/index';
import { game } from './routes/game';
import { stats } from './routes/stats';

import Router from './utils/router';
import EventBus from './utils/EventBus';

import Menu from './components/Menu';

const routes = [index, game, stats];

const eventBus = new EventBus();

new Router({routes, eventBus});

const menu = document.querySelector('.menu');
new Menu(menu).renderMenu();
