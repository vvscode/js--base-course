let Router = function (options) {
    this.routes = options.routes || [];
    this.init();
}

Router.prototype = {
    init: function () {
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function () {

        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        let route = this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });

        return route;
    },
    getRouteParams(route, url) {
        let params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        let previousRoute = this.findPreviousActiveRoute();
        let newRoute = this.findNewActiveRoute(url);
        let routeParams = this.getRouteParams(newRoute, url);

        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
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
        match: '',
        onBeforeEnter: () => {
            onFormChange();
            show('index');
        },
        onEnter: () => startDrawCalendar()
    }, {
        name: 'calendar',
        match: 'calendar',
        onBeforeEnter: () => {
            let myCalendar = document.querySelector("div[id|='calendar']");
            if (!myCalendar) {
                let calendarSettings = JSON.parse(localStorage['calendarSettings']);
                let month = +calendarSettings.date[1];
                let year = +calendarSettings.date[0];
                let fullCalendar = document.createElement("div");
                fullCalendar.setAttribute("id", 'calendar');
                calendar.prototype.drawCalendar(year, month, fullCalendar, calendarSettings);
                document.body.appendChild(fullCalendar);
            }
            myCalendar = document.querySelector("div[id|='calendar']");
            myCalendar.style.display = "block";
            myCalendar.classList.add("fullCalendar");
        },
        onEnter: () => show('calendar'),
        onLeave: () => {
            let myCalendar = document.querySelector("div[id|='calendar']");
            myCalendar.classList.remove("fullCalendar");
        }
    }, {
        name: 'about',
        match: 'about',
        onBeforeEnter: () => show('about'),
        onEnter: () => addAbout(),
        onLeave: () => {
            let aboutDiv = document.querySelector("div[id='aboutDiv']");
            aboutDiv.style.display = "none";
        }
    }]
});