//NOTE: support URL like: ...#page?data=value&nextData=nextValue
var Router = function(routes) {
  this.routes = routes;
  this.currentPage = null; 
  this.currentPageParams = null;
  this.loadPage();  
  window.addEventListener('hashchange', this.loadPage.bind(this));
};

Router.prototype.getHash = function() {
  return window.location.hash.split('#').pop();
};

Router.prototype.getHashParameters = function() {
  var parameters = {};
  window.location.hash.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
    parameters[key] = value;
  });
  return parameters;
}

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

Router.prototype.loadPage = function() {
  var pageHash = this.getHash();
  var pageParams = this.getHashParameters();
  var previousRoute = this.findRoute(this.currentPage);
  var currentRoute = this.findRoute(pageHash);
  return Promise.resolve()
    .then(() => currentRoute && previousRoute 
                  && previousRoute.onLeave && typeof previousRoute.onLeave === "function" 
                  && previousRoute.onLeave(this.currentPageParams))        
    .then(() => currentRoute && currentRoute.onBeforeEnter 
                  && typeof currentRoute.onBeforeEnter === "function" 
                  && currentRoute.onBeforeEnter(pageParams))    
    .then(() => currentRoute && currentRoute.onEnter
                  && typeof currentRoute.onEnter === "function" 
                  && currentRoute.onEnter(pageParams))
    .then(() => {
      this.currentPage = pageHash;
      this.currentPageParams = pageParams;
    });
};