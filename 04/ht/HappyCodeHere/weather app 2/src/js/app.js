import EventBus from './utils/EventBus';
import Router from './utils/router';

import Switcher from './components/Switcher';
import Menu from './components/Menu';
import Search from './components/Search';

import History from './components/History';
import Favorites from './components/Favorites';

import { index } from './routes/index';
import { city } from './routes/city';
import { coordinates } from './routes/coordinates';
import { about } from './routes/about';


const eventBus = new EventBus();

const routes = [index, city, coordinates, about];


new Switcher(eventBus, '.switcher').renderSwitcher();
new Menu('.menu').renderMenu();
new Search(eventBus, '.search').renderSearch();


new Router({routes, eventBus});


new History(eventBus, '.history').renderHistory();
new Favorites(eventBus, '.favorites').renderFavorites();
