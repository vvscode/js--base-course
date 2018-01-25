/**
 * Функция для добавления и обработки роутов на странице
 * @param {*} routeParams массив параметров для обработки роутов
 */
function Router(routeParams) {
    this.routes = routeParams || [];
    this.currentRoute;
    this.previousRoute;
    this.currentParams;
    this.previousParams;
    window.addEventListener('hashchange', (event) => {
        this.handler(window.location.hash);
    })
    this.handler(window.location.hash);
}

Router.prototype = {
    handler: function(hash) {
        this.previousRoute = this.currentRoute;
        this.previousParams = this.currentParams;
        this.currentRoute = this.findNewRoute(hash);
        this.launchHandlers();
    },
    findNewRoute: function(hash) {
        hash = hash.slice(1);

        for (var i = 0; i < this.routes.length; i++) {
            var element = this.routes[i];
            if (typeof(element.match) == "string" && element.match === hash) {
                this.currentParams = '';
                return element;
            }
            if (typeof(element.match) == "function" && element.match(hash)) {
                this.currentParams = '';
                return element;
            }
            if ((element.match instanceof RegExp) && element.match.test(hash)) {
                this.currentParams = hash.match(element.match) || [];
                this.currentParams.splice(0, 1);
                return element;
            }
        }
    },
    launchHandlers() {
        Promise.resolve()
            .then(() => { this.previousRoute && this.previousRoute.onLeave && this.previousRoute.onLeave(this.previousParams) })
            .then(() => { this.currentRoute && this.currentRoute.onBeforeEnter && this.currentRoute.onBeforeEnter(this.currentParams) })
            .then(() => { this.currentRoute && this.currentRoute.onEnter && this.currentRoute.onEnter(this.currentParams) });
    }
}

export default Router;