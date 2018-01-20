import Router from './utils/router';
import routes from './routes/routes';

var router = new Router(routes);

document.getElementById('links').addEventListener('click', (ev) => {
    if (!ev.target.matches('a')) {
        return;
    }
    ev.preventDefault();

    var url = ev.target.getAttribute('href');
    window.location.hash = url;
});