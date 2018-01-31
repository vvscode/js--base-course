let console = {
  log: (text) => (document.querySelector('#logs').innerHTML += `${text}<br />`),
};
/**
 * Router class
 * @constructor
 *
 */
class Router {
  /**
   * @param {array} routes
   */
  constructor(routes) {
    this.routes = routes || [];
    this.currentHash;
    this.nextRoute;
    this.init();
  }

  /**
   *
   */
  init() {
    console.log('Starting router');
    window.addEventListener('hashchange', () =>
      this.handleUrl(window.location.hash)
    );
    this.handleUrl(window.location.hash);
  }

  /**
   * @return {object}
   */
  leaveRoute() {
    console.log(`\nleaving route ${(this.lastRoute || []).name}`);
    return this.lastRoute;
  }
  /**
   *
   * @param {string} hash
   * @return {object}
   */
  findNextRoute(hash) {
    let route = this.routes.find((route) => {
      if (typeof route.match === 'string') {
        return hash === route.match;
      } else if (route.match instanceof RegExp) {
        return hash.match(route.match);
      } else if (typeof route.match === 'function') {
        return route.match(hash);
      }
    });

    console.log(`changing route to ${hash} ---> ${(route || []).name}`);
    return route;
  }
  /**
   *
   * @param {object} route
   * @param {string} hash
   * @return {array}
   */
  getRouteParams(route, hash) {
    let params = hash.match(route.match) || [];
    params.shift();
    return params;
  }
  /**
   * @argument {string} url
   */
  handleUrl(url) {
    this.currentHash = url.slice(1);
    let lastRoute = this.leaveRoute();
    let nextRoute = this.findNextRoute(this.currentHash);
    let routeParams = this.getRouteParams(nextRoute, this.currentHash);

    Promise.resolve()
      .then(
        () =>
          lastRoute &&
          lastRoute.onLeave &&
          lastRoute.onLeave(...this.routeParams)
      )
      .then(
        () =>
          nextRoute &&
          nextRoute.onBeforeEnter &&
          nextRoute.onBeforeEnter(...routeParams)
      )
      .then(
        () =>
          nextRoute && nextRoute.onEnter && nextRoute.onEnter(...routeParams)
      )
      .then(() => {
        this.lastRoute = nextRoute;
        this.routeParams = routeParams;
      });
  }
}
