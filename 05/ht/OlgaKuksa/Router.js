var Router = function (options) {
    this.routes = options.routes || [];
    this.currParam = '';
    this.prevParam;
    this.currRoute;
    this.prevRoute;
    window.addEventListener("hashchange", this.hashChangeActions.bind(this));
    this.hashChangeActions();
}

Router.prototype = {
    hashChangeActions: function () {
        hash = window.location.hash;
        //getting rid of # at the beginning
        if (hash.length > 1) hash = hash.slice(1);
        else hash = '';
        this.prevRoute = this.currRoute;
        this.prevParam = this.currParam;
        this.routes.forEach((routeItem) => {

            if (typeof routeItem.match === "string" && routeItem.match === hash) {
                this.currRoute = routeItem;
                this.currParam = '';

            }
            else if ((routeItem.match instanceof RegExp) && routeItem.match.test(hash)) {
                this.currParam = hash.match(routeItem.match) || [];
                this.currParam.splice(0, 1);
                this.currRoute = routeItem;
            }
            else if (typeof routeItem.match === "function" && routeItem.match(hash)) {
                this.currRoute = routeItem;
                this.currParam = '';
            }
        });
        this.triggerHandlers();
    },
    triggerHandlers: function () {
        Promise.resolve().then(() => { this.prevRoute && this.prevRoute.onLeave && this.prevRoute.onLeave(this.prevParam)})
            .then(() => { this.currRoute && this.currRoute.onBeforeEnter && this.currRoute.onBeforeEnter(this.currParam) })
            .then(() => { this.currRoute && this.currRoute.onEnter && this.currRoute.onEnter(this.currParam) })
    }

}