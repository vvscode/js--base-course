var Router = function (options) {
    this.routes = options.routes || [];
    this.prevRoute;
    this.prevParam;
    this.activeRoute;
    this.activeParam;
    window.addEventListener("hashchange", () =>
        //обаботка события изменения url
        this.handleHashChange(window.location.hash)
    );
    this.handleHashChange(window.location.hash); //при перезагрузке станицы вызвать нужные функции
};
//обработчик смены url
Router.prototype.handleHashChange = function (url) {
    url = url.slice(1);
    this.routes.forEach((item, i, arr) => {
        if (typeof item.match === "string" && item.match === url) {
            this.activeRoute = item;
        }
        if (typeof item.match === "function" && item.match(url)) {
            this.activeRoute = item;
        }
        if (item.match instanceof RegExp && item.match.test(url)) {
            this.activeRoute = item;
        }
    });
    this.activeParam = this.getParams(url);
    this.execFunctions();
};
//извлечение параметров из url
Router.prototype.getParams = function (url) {
    let params = url.match(this.activeRoute.match) || [];
    if (params.length == 2) return params[1];
    return params;
};
//запуск функций из маршрутов
Router.prototype.execFunctions = function () {
    Promise.resolve()
        .then(() => {
            if (this.prevRoute) this.prevRoute.onLeave(this.prevParam);
        })
        .then(() => {
            if (this.activeRoute) this.activeRoute.onBeforeEnter(this.activeParam);
        })
        .then(() => {
            if (this.activeRoute) this.activeRoute.onEnter(this.activeParam);
        })
        .then(() => {
            this.prevRoute = this.activeRoute;
            this.prevParam = this.activeParam;
        });
};
