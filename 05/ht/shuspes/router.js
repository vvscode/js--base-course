var Router = function(routes) {
  this.routes = routes;
  this.currentPage = this.getPage();
  window.addEventListener('hashchange', this.handleURL.bind(this));
};

Router.prototype.handleURL = function() {
  var page = this.getPage();
  // if(page === this.currentPage) return;
  this.loadPage(page);
};

Router.prototype.getPage = function() {
  return window.location.hash.split('#').pop();
};

Router.prototype.findRoute = function(pageName) {
  if(!this.routes) return undefined;
  return this.routes.find(route => {
    if(typeof route.match === "string") {
      return route.match === pageName;
    } else if(typeof route.match === "function") {
      return route.match(pageName);
    } else if(route.match instanceof RegExp) {
      return route.match.test(pageName);
    }
  });
};

Router.prototype.loadPage = function(page) {
  var previousRoute = this.findRoute(this.currentPage);
  var currentRoute = this.findRoute(page);
  return Promise.resolve()
    .then(() => currentRoute && previousRoute 
                  && previousRoute.onLeave && typeof previousRoute.onLeave === "function" 
                  && previousRoute.onLeave())        
    .then(() => currentRoute && currentRoute.onBeforeEnter 
                  && typeof currentRoute.onBeforeEnter === "function" 
                  && currentRoute.onBeforeEnter())    
    .then(() => currentRoute && currentRoute.onEnter
                  && typeof currentRoute.onEnter === "function" 
                  && currentRoute.onEnter());
};

// Router.prototype.setRoute = function(route) {
//
// };

// Router.prototype.removeRoute = function(match) {
//
// }