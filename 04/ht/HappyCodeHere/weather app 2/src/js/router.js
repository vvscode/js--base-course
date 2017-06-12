// d2. Реализовать Router
// - создать конструктор
// - обработчик изменения адреса
// - при создании выплнил обработчик изменения адреса
// - научиться определять роут по адресу ( какой роут нужно активировать )
// - находить/сохранять последний активный роут
// - вызвать onLeave
// - вызвать onBeforeEnter
// - вызвать onEnter
// - обрабатывать отсутствие фукнций-хуков
// - поддерживать promise из onBeforeEnter
// - поддерживать promise из onLeave


class Router {
  constructor(routes, eventBus) {
    this.eventBus = eventBus;
    this.routes = routes;

    this.handleHashChange = this.handleHashChange.bind(this);

    window.addEventListener('hashchange', this.handleHashChange);
    this.handleHashChange();
  }

  handleHashChange() {
    const lastRoute = window.location.oldUrl;
    const newRoute = window.location.hash;


    // last route onLeave
    this.routes[lastRoute].onLeave(this.eventBus)
      .then(() => {
        // new route beforeEnter
        return this.routes[newRoute].onBeforeEnter(this.eventBus);
      })
      .then(() => {
        // new route onEnter
        return this.routes[newRoute].onEnter(this.eventBus);
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default Router;
