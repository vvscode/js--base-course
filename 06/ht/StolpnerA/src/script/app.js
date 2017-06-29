
import EventBus from './utils/eventBus';
import Router from './utils/router';

import { index } from './routes/index';
import { about } from './routes/about';
import { game } from './routes/game';

const routes = [index, about, game];

const eventBus = new EventBus();

new Router({routes}, eventBus);