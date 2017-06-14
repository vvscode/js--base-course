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
 */

var Router = function (routes, eventBus) {
    this.routes = routes;
    this.eventBus = eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        window.addEventListener('hashchange', (ev) => this.handleUrl(ev.oldURL, ev.newURL));
        //this.handleUrl();
    },
    handleUrl: function (oldRoute, newRoute) {
        debugger;
        // if (oldRoute){
        //     this.routes[oldRoute].onLeave();
        // }
        this.routes[0].onBeforeEnter();
        this.routes[newRoute].onEnter();
    }
};

// window.addEventListener('hashchange', (ev) => console.log('onHashChange', ev));
//
// window.location.hash = 'some';

var router = new Router([
    {
        name: 'index',
        match: '',
        onBeforeEnter: () => console.log('onBeforeEnter index'),
        onEnter: () => console.log('onEnter index'),
        onLeave: () => console.log('onLeave index')
    },
    {
        name: 'city',
        match: /city=(.+)/,
        onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
        onEnter: (city) => console.log(`onEnter city:${city}`),
        onLeave: (city) => console.log(`onLeave city:${city}`)
    },
    {
        name: 'about',
        match: (text) => text === 'about',
        onBeforeEnter: () => console.log(`onBeforeEnter about`),
        onEnter: () => console.log(`onEnter about`),
        onLeave: () => console.log(`onLeave about`)
    }
],  {});

window.location.href += '/city=minsk/';