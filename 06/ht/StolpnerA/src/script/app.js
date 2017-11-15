import Router from "./utils/Router";
import EventBus from "./utils/EventBus";

import { about } from "./routes/about";
import { main } from "./routes/main";
import { coordinates } from "./routes/coordinates";
import { city } from "./routes/city";

const eventBus = new EventBus();
const routes = [about, main, coordinates, city];
new Router({ routes }, eventBus).init();
