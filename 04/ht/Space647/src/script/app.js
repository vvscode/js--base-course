import Router from "./utils/Router";
import { index } from "./routes/index";
import { about } from "./routes/about";
import { main } from "./routes/main";
const routes = [index, about, main];
new Router({ routes });
