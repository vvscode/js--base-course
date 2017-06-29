
// смысл понял, потом напишу свой

class Router {
  constructor(config) {
    this.eventBus = config.eventBus;
    this.routes = config.routes || [];

    this.init();
  }

  init() {
    console.log('---> router init');
    // 1. Подписать this.handleUrl на изменения url
    window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
    // 2. Выполнить this.handleUrl
    this.handleUrl(window.location.hash);
  }

  findPreviousActiveRoute() {
    console.log(`---> router findPreviousActiveRoute: ${(this.currentRoute || {}).name}`);
    // Найти роут с которого уходим
    return this.currentRoute;
  }

  findNewActiveRoute(url) {
    // Найти роут на который переходим
    // console.log(this.routes);
    let route = this.routes.find((routeItem) => {
      if (typeof routeItem.match === 'string') {
        return url === routeItem.match;
      } else if (typeof routeItem.match === 'function') {
        return routeItem.match(url);
      } else if (routeItem.match instanceof RegExp) {
        return url.match(routeItem.match);
      }
    });

    console.log(`---> router findNewActiveRoute: ${url} -- ${(route || {}).name}`);
    return route;
  }
  // getRouteParams(route, url) {
  // 	 var params = url.match(route.match) || [];
  //    params.shift();
  //    return params;
  // },
  handleUrl(url) {
    url = url.slice(1);
    // Найти текущий роут
    let previousRoute = this.findPreviousActiveRoute();
    // Найти новый роут
    let newRoute = this.findNewActiveRoute(url);
    // console.log(newRoute);
    // console.log(url);

    // let routeParams = this.getRouteParams(newRoute, url);

    // Если есть роут с которого уходим - выполнить его .onLeave
    Promise.resolve()
      .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(window.location.hash, this.eventBus))
      // После этого выполнить .onBeforeEnter для нового активного роута
      .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(window.location.hash, this.eventBus))
      // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)

      .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(window.location.hash, this.eventBus))
      .then(() => {
      		this.currentRoute = newRoute;
      		// this.currentRouteParams = routeParams;
    });
  }
};

export default Router;



// class Router {
//   constructor(routes, eventBus) {
//     this.eventBus = eventBus;
//     this.routes = routes;
//
//     this.handleHashChange = this.handleHashChange.bind(this);
//   }
//
//
//   init() {
//     window.addEventListener('hashchange', this.handleHashChange);
//     this.handleHashChange();
//   }
//
//   findPreviousActiveRoute() {
//
//   }
//
//   findNewActiveRoute() {
//
//   }
//
//
//   handleHashChange() {
//     const lastRoute = window.location.oldUrl;
//     const newRoute = window.location.hash;
//
//
//
//     // last route onLeave
//     this.routes[lastRoute].onLeave(this.eventBus)
//       .then(() => {
//         // new route beforeEnter
//         return this.routes[newRoute].onBeforeEnter(this.eventBus);
//       })
//       .then(() => {
//         // new route onEnter
//         return this.routes[newRoute].onEnter(this.eventBus);
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }
// }
//
// export default Router;
