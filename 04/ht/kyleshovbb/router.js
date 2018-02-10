let Router = function (options) {
    this.routes = options.routes || [];
    this.init();
};

Router.prototype = {
    /**
     * Подписываемся на изменение Хэша
     */
    init: function () {
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        this.handleUrl(window.location.hash);
    },
    /**
     * находим роут с которого уходим
     */
    findPreviousActiveRoute: function () {
        return this.currentRoute;
    },
    /**
     * находим роут на который переходим
     */
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
    /**
     * Находим роут на который переходим
     * @param {object} route - Указываем роутер
     * @param {string} url - Получаем хэш из урла
     * @returns {array} params - Массив с параметрами роутера
     */
    getRouteParams(route, url) {
        let params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    /**
     * Находим текущий и прошлый роутер
     */
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
        /**
         * Переписываем на странице блок с JS кодом и скрываем HTML элементы не относящиеся к
         * странице "'index'"
         */
        onBeforeEnter: () => {
            let calendar = document.querySelector("div[id|='calendar']");
            let indexDiv = document.querySelector("#index");
            if (calendar) {
                calendar.style.display = "block";
            }
            indexDiv.style.display = "block";
            onFormChange();
        },
        onEnter: () => startDrawCalendar(),
        onLeave: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
        }
    }, {
        name: 'calendar',
        match: 'calendar',
        /**
         * Если нету блока с календарём, то создаём свой и добавляем ему класс .fullCalendar
         */
        onEnter: () => {
            let myCalendar = document.querySelector("div[id|='calendar']");
            if (!myCalendar) {
                let calendarSettings = JSON.parse(localStorage['calendarSettings']);
                let fullCalendar = document.createElement("div");
                fullCalendar.setAttribute("id", 'calendar');
                document.body.appendChild(fullCalendar);
                new Calendar(calendarSettings);
            }
            myCalendar = document.querySelector("div[id|='calendar']");
            myCalendar.classList.add("fullCalendar");
            myCalendar.style.display = "block";
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
        },
        /**
         * Удаляем с блока класс .fullCalendar
         */
        onLeave: () => {
            let myCalendar = document.querySelector("div[id|='calendar']");
            myCalendar.classList.remove("fullCalendar");
        }
    }, {
        name: 'about',
        match: 'about',
        /**
         * Скрываем элементы, которые не относятся к странице "about"
         */
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
            let calendar = document.querySelector("div[id|='calendar']");
            if (calendar) {
                calendar.style.display = "none";
            }
            let aboutDiv = document.querySelector("div[id='aboutDiv']");
            if (aboutDiv) {
                aboutDiv.style.display = "block";
            }
        },
        /**
         * Создаём или отображаем блок с текстом на странице "about"
         */
        onEnter: () => addAbout(),
        /**
         * Скрываем блок с текстом на странице "about"
         */
        onLeave: () => {
            let aboutDiv = document.querySelector("div[id='aboutDiv']");
            aboutDiv.style.display = "none";
        }
    }]
});