import Router from "./utils/Router";
import EventBus from "./utils/EventBus";

import { about } from "./routes/about";
import { main } from "./routes/main";
import { coordinates } from "./routes/coordinates";

const eventBus = new EventBus();
const routes = [about, main, coordinates];
new Router({ routes }, eventBus).init();
