"use strict";

// components
import Arena from './components/arena';
import Controls from './components/controls';
import ReplayGame from './components/replayGame';

// routes
import Index from './routes/index';
import Play from './routes/play';
import Replay from './routes/replay';
import Results from './routes/results';

// utils
import Router from './utils/router';
import EventBus from './utils/eventBus';
import Game from './utils/game';

const eventBus = new EventBus();
const index = new Index(eventBus); // не менять порядок

const arena = new Arena();
const replayGame = new ReplayGame(arena);
const controls = new Controls(eventBus);
const game = new Game(arena, eventBus);

const play = new Play(game);
const results = new Results(game);
const replay = new Replay(replayGame, eventBus);

const routes = [index, play, replay, results];
new Router(routes, eventBus);