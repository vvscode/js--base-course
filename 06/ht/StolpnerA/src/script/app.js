import Router from "./utils/Router";
import EventBus from "./utils/EventBus";

import { about } from "./routes/about";
import { main } from "./routes/main";

const eventBus = new EventBus();
const routes = [about, main];
new Router({ routes }, eventBus).init();
