class Router {
  constructor(options, eventBus) {
    this.routes = options.routes;
    this.eventBus = eventBus;
  }

  init() {
    window.addEventListener("hashchange", ev =>
      this.handleUrl(ev.oldURL.split("#")[1] || "", ev.newURL.split("#")[1])
    );
    this.handleUrl(undefined, window.location.hash.slice(1));
  }

  getParam(newRoute, currentRoute) {
    let param = newRoute.match(currentRoute.match) || [];
    return param[1];
  }

  handleUrl(oldRoute, newRoute) {
    let currentRoute = this.routes.find(item => {
      if (typeof item.match === "string") {
        newRoute = newRoute.split("?")[0];
        return newRoute === item.match;
      } else if (typeof item.match === "function") {
        return item.match(newRoute);
      } else if (item.match instanceof RegExp) {
        return newRoute.match(item.match);
      }
    });
    if (oldRoute !== undefined) {
      var previousRoute = this.routes.find(item => {
        if (typeof item.match === "string") {
          return oldRoute === item.match;
        } else if (typeof item.match === "function") {
          return item.match(oldRoute);
        } else if (item.match instanceof RegExp) {
          return oldRoute.match(item.match);
        }
      });
    }
    let currentParam = this.getParam(newRoute, currentRoute);

    Promise.resolve()
      .then(
        () =>
          previousRoute &&
          previousRoute.onLeave &&
          previousRoute.onLeave(oldRoute.split("=")[1])
      )
      .then(
        () =>
          currentRoute &&
          currentRoute.onBeforeEnter &&
          currentRoute.onBeforeEnter(currentParam)
      )
      .then(
        () =>
          currentRoute &&
          currentRoute.onEnter &&
          currentRoute.onEnter(this.eventBus, currentParam)
      );
  }
}
export default Router;
