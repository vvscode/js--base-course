import Router from "./utils/Router";
import { index } from "./routes/index";
import { main } from "./routes/main";
const routes = [index, main];
new Router({ routes });
