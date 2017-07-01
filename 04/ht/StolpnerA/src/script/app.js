
import EventBus from './utils/eventBus';
import Router from './utils/router';

import { index } from './routes/index';
import { about } from './routes/about';
import { city } from './routes/city';

const routes = [index, about, city];
new Router({routes});