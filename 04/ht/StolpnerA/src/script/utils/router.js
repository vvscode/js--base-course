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


 var x = {
 x: 1
 };

 var show = function (obj) {
 console.log(obj.x);
 }


 show(x);
 show({
 x: 2
 })

 function Router(routes, eventBus){
 this.routes = routes;
 this.eventBus = eventBus;
 }
 // window.addEventListener('hashchange', (ev) => console.log('onHashChange', ev));
 //
 // window.location.hash = 'some';
 */
var console = {
    log: (text) => document.querySelector('#logs').innerHTML += `${text}<br />`
};
var Router = function (options) {
    this.routes = options.routes;
    //this.eventBus = eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        console.log(`---> router init`);
        window.addEventListener('hashchange', (ev) => this.handleUrl(ev.oldURL.split('#')[1], ev.newURL.split('#')[1]));
        this.handleUrl(null, window.location.hash.slice(1));
    },
    getParam: function (newRoute, route) {
        var param = newRoute.match(route.match) || [];
        return param[1];
    },
    handleUrl: function (oldRoute, newRoute) {
        debugger;
        var route = this.routes.find((item) => {
            if (typeof item.match === 'string'){
                return newRoute === item.match;
            } else if (typeof item.match === 'function'){
                return item.match(newRoute);
            }else if (item.match instanceof RegExp){
                return newRoute.match(item.match);
            }
        });
        var currentParam = this.getParam(newRoute, route);

        console.log(`---> router findNewActiveRoute: ${newRoute} -- ${(route || {}).name}`);
        Promise.resolve()
        //.then(() => oldRoute && oldRoute.onLeave && oldRoute.onLeave())
            .then(() => route && route.onBeforeEnter && route.onBeforeEnter(currentParam))
            .then(() => route && route.onEnter && route.onEnter(currentParam))
    }
};


var router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onBeforeEnter: () => console.log('onBeforeEnter index'),
        onEnter: () => console.log('onEnter index'),
        onLeave: () => console.log('onLeave index')
    }, {
        name: 'city',
        match: /city=(.+)/,
        onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
        onEnter: (city) => console.log(`onEnter city:${city}`),
        onLeave: (city) => console.log(`onLeave city:${city}`)
    }, {
        name: 'about',
        match: (text) => text === 'about',
        onBeforeEnter: () => console.log(`onBeforeEnter about`),
        onEnter: () => {
            console.log(`onEnter about`);
            //document.querySelector('#content').innerHTML = '<h1>About</h1>';
        },
        onLeave: () => {
            console.log(`onLeave about`);
            document.querySelector('#content').innerHTML = '';
        }
    }]
});

//window.location.href = 'about';