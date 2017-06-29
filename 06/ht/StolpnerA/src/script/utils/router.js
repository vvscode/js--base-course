/*
 Реализовать Router

 создать конструктор
 обработчик изменения адреса
 при создании выплнил обработчик изменения адреса
 научиться определять роут по адресу ( какой роут нужно активировать )
 находить/сохранять последний активный роут
 вызвать onLeave
 вызвать onBeforeEnter
 вызвать onEnter
 обрабатывать отсутствие фукнций-хуков
 поддерживать promise из onBeforeEnter
 поддерживать promise из onLeave
 */
var Router = function (options, eventBus) {
    this.routes = options.routes;
    this.eventBus = eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        window.addEventListener('hashchange', (ev) => this.handleUrl(ev.oldURL.split('#')[1] || '', ev.newURL.split('#')[1]));
        this.handleUrl(undefined, window.location.hash.slice(1));
    },
    getParam: function (newRoute, currentRoute) {
        var param = newRoute.match(currentRoute.match) || [];
        return param[1];
    },
    handleUrl: function (oldRoute, newRoute) {
        var currentRoute = this.routes.find((item) => {
            if (typeof item.match === 'string') {
                return newRoute === item.match;
            } else if (typeof item.match === 'function') {
                return item.match(newRoute);
            } else if (item.match instanceof RegExp) {
                return newRoute.match(item.match);
            }
        });
        if (oldRoute !== undefined) {
            var previousRoute = this.routes.find((item) => {
                if (typeof item.match === 'string') {
                    return oldRoute === item.match;
                } else if (typeof item.match === 'function') {
                    return item.match(oldRoute);
                } else if (item.match instanceof RegExp) {
                    return oldRoute.match(item.match);
                }
            });
        }
        var currentParam = this.getParam(newRoute, currentRoute);
        console.log(`---> router oldURL: ${oldRoute}`);
        console.log(`---> router findNewActiveRoute: ${newRoute} -- ${(currentRoute || {}).name}`);
        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(oldRoute.split('=')[1]))
            .then(() => currentRoute && currentRoute.onBeforeEnter && currentRoute.onBeforeEnter(currentParam))
            .then(() => currentRoute && currentRoute.onEnter && currentRoute.onEnter(this.eventBus, currentParam))
    }
};

export default Router;

// var router = new Router({
//     routes: [{
//         name: 'index',
//         match: '',
//         onBeforeEnter: () => console.log('onBeforeEnter index'),
//         onEnter: () => console.log('onEnter index'),
//         onLeave: () => console.log('onLeave index')
//     }, {
//         name: 'city',
//         match: /city=(.+)/,
//         onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
//         onEnter: (city) => console.log(`onEnter city:${city}`),
//         onLeave: (city) => console.log(`onLeave city:${city}`)
//     }, {
//         name: 'about',
//         match: (text) => text === 'about',
//         onBeforeEnter: () => console.log(`onBeforeEnter about`),
//         onEnter: () => {
//             console.log(`onEnter about`);
//             //document.querySelector('#content').innerHTML = '<h1>About</h1>';
//         },
//         onLeave: () => {
//             console.log(`onLeave about`);
//             document.querySelector('#content').innerHTML = '';
//         }
//     }]
// });