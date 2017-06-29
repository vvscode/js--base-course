
import EventBus from './utils/eventBus';
import Router from './utils/router';

import { index } from './routes/index';
import { about } from './routes/about';
import { game } from './routes/game';

const eventBus = new EventBus();

const routes = [index, about, game];
new Router({routes});