
import EventBus from './utils/eventBus';
import Router from './utils/router';

import { index } from './routes/index';
import { about } from './routes/about';

//var router = new Router({routes:[index,about]});

const routes = [index, about];
new Router({routes});