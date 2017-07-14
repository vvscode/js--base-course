// components
import Coordinates from './components/coordinates';
import Favorites from './components/favorites';
import Forecast from './components/forecast';
import History from './components/history';
import Map from './components/map';
import Search from './components/search';

// routes
import Index from './routes/index';
import About from './routes/about';

// utils
import General from './utils/general';
import Router from './utils/router';
import Request from './utils/request';

const general = new General();
const map = new Map(general);
const index = new Index(map);
const about = new About();
const request = new Request(map, general);
const routes = [index, about];

new Router(routes, general);
new Search(request, general);
new Forecast(general);
new Coordinates(request, map);
new History(request, general);
new Favorites(map, request, general);