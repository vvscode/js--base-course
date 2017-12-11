import Router from "./utils/router";
import { index } from "./routes/index";
import {about} from "./routes/about"
import {weather} from "./routes/weather"
const routes = [index,about,weather];
new Router({ routes });
