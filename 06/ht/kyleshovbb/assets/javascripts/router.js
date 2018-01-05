function Router(options = []) {
    this.routes = options.routes;
    window.addEventListener("hashchange", () => this.hashCheck(window.location.hash));
    this.hashCheck(window.location.hash);
}

Router.prototype = {
    findNewRoute: function (hash) {
        let route;
        let self = this;
        if (!this.routes) {
            return;
        } else if (this.routes.length === 1) {
            return this.findRoute(hash, this.routes[0]);
        } else {
            this.routes.forEach((routeItem) => {
                if (self.findRoute(hash, routeItem)) {
                    return route = routeItem;
                }
            });
        }
        return route;
    },
    findRoute: function (hash, item) {
        if (typeof item.match === 'string' && hash === item.match ||
            typeof item.match === 'function' && item.match(hash) ||
            item.match instanceof RegExp && hash.match(item.match)) {
            return item;
        }
    },
    hashCheck: function (hash) {
        hash = hash.slice(1);
        let preRoute = this.activeRoute;
        let newRoute = this.findNewRoute(hash);

        if (!newRoute) {
            return;
        } else if (typeof newRoute.match === 'string') {
            this.routeParams = newRoute.match;
        } else if (newRoute.match instanceof RegExp) {
            this.routeParams = hash.match(newRoute.match)[1];
        } else if (typeof newRoute.match === 'function') {
            this.routeParams = newRoute.match(hash);
        }

        Promise.resolve()
            .then(() => {
                if (preRoute && preRoute.onLeave) {
                    this.preRouteParams ? preRoute.onLeave(this.preRouteParams) : preRoute.onLeave()
                }
            })
            .then(() => {
                if (newRoute && newRoute.onBeforeEnter) {
                    this.routeParams ? newRoute.onBeforeEnter(this.routeParams) : newRoute.onBeforeEnter()
                }
            })
            .then(() => {
                if (newRoute && newRoute.onEnter) {
                    this.routeParams ? newRoute.onEnter(this.routeParams) : newRoute.onEnter()
                }
            })
            .then(() => {
                this.activeRoute = newRoute;
                this.preRouteParams = this.routeParams;
            })
            .catch(() => {
            });
    },
};

let router = new Router({
    routes: [{
        name: 'index',
        match: '',
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "block";
        },
        onEnter: () => {
            let yandexMap = document.querySelector("#yandexMap");
            ymaps.ready(initDrawMap);

            function initDrawMap(event) {
                if (!yandexMap.children.length) {
                    let userLocation = getUserLocation();
                    userLocation
                        .then((location) => {
                            drawYandexMap(event,[location.position.latitude,location.position.longitude]);
                            window.location.hash = `/city/${location.city.name}/`;
                            addCityToHistory();
                            addCityToFavorite();
                        })
                }
            }
        },
        onLeave: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
        }
    }, {
        name: 'About',
        match: 'About',
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
            let authorDiv = document.querySelector("#authorDiv");
            if (authorDiv) {
                authorDiv.style.display = "none";
            }
        },
        onEnter: () => {
            let aboutDiv = document.querySelector("#aboutDiv");
            if (!aboutDiv) {
                addAbout();
            } else {
                aboutDiv.style.display = "block";
            }
        },
        onLeave: () => {
            let aboutDiv = document.querySelector("#aboutDiv");
            aboutDiv.style.display = "none";
        }
    }, {
        name: 'Author',
        match: 'Author',
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "none";
            let aboutDiv = document.querySelector("#aboutDiv");
            if (aboutDiv) {
                aboutDiv.style.display = "none";
            }
        },
        onEnter: () => {
            let authorDiv = document.querySelector("#authorDiv");
            if (!authorDiv) {
                addAuthor();
            } else {
                authorDiv.style.display = "block";
            }
        },
        onLeave: () => {
            let authorDiv = document.querySelector("#authorDiv");
            authorDiv.style.display = "none";
        }
    }, {
        name: 'cityName',
        match: /city\/(.+)/,
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "block";
        },
        onEnter: cityName => {
            let yandexMap = document.querySelector("#yandexMap");
            ymaps.ready(initDrawMap);

            function initDrawMap() {
                if (!yandexMap.children.length) {
                    searchCity(null, cityName.slice(0, -1));
                    addCityToFavorite();
                }
            }
        }
    }, {
        name: 'location',
        match: /location\/(.+)/,
        onBeforeEnter: () => {
            let indexDiv = document.querySelector("#index");
            indexDiv.style.display = "block";
        },
        onEnter: locationMap => {
            let yandexMap = document.querySelector("#yandexMap");
            ymaps.ready(initDrawMap);
            let locationMapArray = locationMap.slice(0, -1).split(",");
            let arrCoords = [locationMapArray[0],locationMapArray[1]];

            function initDrawMap() {
                if (!yandexMap.children.length) {
                    drawYandexMap(event,arrCoords,locationMapArray[2]);
                    addCityToHistory();
                    addCityToFavorite();
                }
            }
        }
    }
]
})
;