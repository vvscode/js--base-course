import EventBus from './utils/EventBus';
import Router from './utils/router';

import Search from './components/Search';
import History from './components/History';
import Favorites from './components/Favorites';
import Switcher from './components/Switcher';

import { index } from './routes/index';
import { city } from './routes/city';
import { coordinates } from './routes/coordinates';
import { about } from './routes/about';


const eventBus = new EventBus();


const routes = [index, city, coordinates, about];

new Router({routes, eventBus});


const search = new Search(eventBus, '.search');
search.renderSearch();


const history = new History(eventBus, '.history');
history.renderHistory();

const favorites = new Favorites(eventBus, '.favorites');
favorites.renderFavorites();


const switcher = new Switcher(eventBus, '.switcher');
switcher.renderSwitcher();
