
import { index } from './routes/index';
import { game } from './routes/game';
import { stats } from './routes/stats';

import Router from './utils/router';
import EventBus from './utils/EventBus';

import Menu from './components/Menu';

const routes = [index, game, stats];

const eventBus = new EventBus();

new Router({routes, eventBus});

new Menu('.menu').renderMenu();



// const canvas = document.querySelector('#canvas');
// const x = canvas.getContext('2d');
//
// x.fillStyle = 'orange';
// x.strokeStyle = 'blue';
// x.lineWidth = 5;
//
// x.strokeRect(0, 0, 150, 50);
// x.fillRect(10, 10, 50, 20);
//
// // x.clearRect(0, 0, 50, 25);
//
// x.beginPath();
// x.arc(75, 75, 50, 0, Math.PI*2, true);
// x.closePath();
// x.fill();
//
// x.moveTo(50, 50);
//
// x.beginPath();
// x.bezierCurveTo(140, 100, 388, 10, 3088, 1070);
// x.stroke();
// x.closePath();
//
// x.moveTo(0, 0);
//
//
// x.fillStyle = '#00f';
// x.strokeStyle = '#f00';
// x.lineWidth = 4;
//
// x.beginPath();
// x.lineTo(10, 10);
// x.lineTo(100, 100);
// x.lineTo(150, 80);
// x.lineTo(10, 10);
// x.fill();
// x.stroke();
// x.closePath();
//
// const img = document.querySelector('img');
//
// x.drawImage(img, 50, 50);

// x.strokeRect(50, 50, 150, 50);
// x.fillRect(10, 10, 50, 20);
