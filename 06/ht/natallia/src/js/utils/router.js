export default class Router {
  constructor(options) {
    this.routes = options.routes || [];
    this.previosRoute;
    this.nextRoute;
    this.prev;
    this.next;
    this.EventBus = options.EventBus;

    this.handleUrl(window.location.hash);
    window.addEventListener('hashchange', () => {
      this.handleUrl(window.location.hash);
    });
  }

  handleUrl(url) {
    this.previosRoute = this.nextRoute;
    this.prev = this.next;
    this.url = url.replace(/#/, '');
    this.routes.forEach(el => {
      if (typeof el.match === 'string' && this.url === el.match) {
        this.nextRoute = url;
        this.next = el || {};
      } else if (typeof el.match === 'function' && el.match(this.url)) {
        this.nextRoute = this.url;
        this.next = el;
      } else if (
        el.match instanceof RegExp &&
        decodeURI(this.url).search(el.match) !== -1
      ) {
        this.url = decodeURI(this.url);
        this.nextRoute = this.url.match(el.match);
        this.nextRoute = this.nextRoute[0];
        this.next = el;
      }
    });
    if (this.previosRoute !== this.nextRoute) {
      Promise.resolve()
        .then(() => {
          this.prev &&
            this.prev.onLeave &&
            this.prev.onLeave(this.previosRoute);
        })
        .then(() => {
          this.next &&
            this.next.onBeforeEnter &&
            this.next.onBeforeEnter(this.nextRoute);
        })
        .then(() => {
          this.next && this.next.onEnter && this.next.onEnter(this.nextRoute);
        });
    }
  }
}
