import EventBus from './utils/EventBus';
import Router from './router';

import index from './routes/index';
import city from './routes/city';
import coordinates from './routes/coordinates';
import about from './routes/about';


const eventBus = new EventBus();

// потом в роутер

const routes = {index, city, coordinates, about};

const router = new Router(routes, eventBus);
