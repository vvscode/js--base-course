let Router = function (options) {
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        // 1. Подписать this.handleUrl на изменения url
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        // 2. Выполнить this.handleUrl
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function () {
        // Найти роут с которого уходим
        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        // Найти роут на который переходим
        return this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });

    },
    getRouteParams(route, url) {
        let params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        // Найти текущий роут
        let previousRoute = this.findPreviousActiveRoute();
        // Найти новый роут
        let newRoute = this.findNewActiveRoute(url);

        let routeParams = this.getRouteParams(newRoute, url);

        // Если есть роут с которого уходим - выполнить его .onLeave
        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            // После этого выполнить .onBeforeEnter для нового активного роута
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
                this.currentRoute = newRoute;
                this.currentRouteParams = routeParams;
            });
    },
};

let router = new Router({
    routes: [{
        name: 'index',
        match: ''
    },{
        name: 'city',
        match: /city(.+)/,
        onEnter: () => {
            newEventBus.trigger('init');
            addClassInShowPage();
        },
    },{
        name: 'string',
        match: (text) => text ,
        onBeforeEnter: () => delClassInPages (),
        onEnter: () => {
            addClassInShowPage();
            if(location.hash === '#main'){
              newEventBus.trigger('main');
            }
        },
        onLeave: () => delClassInPages ()
    }]
});

function addClassInShowPage() {
    let thisPageHash = location.hash.split('#').join('');
    let thisPage;
    if(thisPageHash === 'about' || thisPageHash === 'author' || thisPageHash === 'main'){
        thisPage = document.querySelector( '.' + location.hash.split('#')[1]);
    } else {
        thisPage = document.querySelector('.main');
    }
    thisPage.classList.add('page_show');
}

function delClassInPages () {
    let allPages = document.querySelectorAll('.page');
    [].forEach.call(allPages, (elem)=>{
        elem.classList.remove('page_show')
    });
}
