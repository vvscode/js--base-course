/**
 * Функция compileTemplate для компиляции шаблона
 * Возвращает функцию, при передаче которой элемента и объекта с данными
 * элемент получает разметку в соответствии с template из templateObject
 * @param {*} template шаблон
 */
function compileTemplate(template) {
    return function(element, templateObject) {
        var pos = -1;

        for (key in templateObject) {
            template = template.split('{{' + key + '}}').join(templateObject[key]);

        }
        element.innerHTML = template;
    }

}


/**
 *Функция EventBus для обмена сообщениями
 */
function EventBus() {
    this.listeners = {};
}

/**
 *Функция trigger для вызова обработчиков события
 *@param event   событие, обработчики которого необходимо вызвать
 */
EventBus.prototype.trigger = function(event) {

    for (var i = 0; i < (this.listeners[event] || []).length; i++) {
        var cb = this.listeners[event][i];
        if (typeof(cb) == 'function') {
            var params = [].slice.call(arguments, 1);
            cb.apply(null, params);
            if (cb.toString().indexOf('self.off') !== -1) {
                i--;
            }
        }
    }
}

/**
 *Функция on для добавления обработчиков события
 *@param event   событие, обработчики которого необходимо добавить
 *@param cb      обработчик события event
 */
EventBus.prototype.on = function(event, cb) {

    this.listeners[event] = (this.listeners[event] || []);
    this.listeners[event].push(cb);
}

/**
 *Функция on для удаления обработчиков события
 *@param event   событие, обработчики которого необходимо удалить
 *@param cb      обработчик события event
 */
EventBus.prototype.off = function(event, cb) {

    if (this.listeners[event] == undefined) {
        return;
    }
    var position = this.listeners[event].indexOf(cb);
    this.listeners[event].splice(position, 1);
}

/**
 *Функция on для добавления обработчика события, который сработает 1 раз
 *@param event   событие, обработчик которого необходимо добавить
 *@param cb      обработчик события event
 */
EventBus.prototype.once = function(event, cb) {
    var self = this;

    function functionToOff() {
        cb.apply(null, arguments);
        self.off(event, functionToOff);
    };

    self.on(event, functionToOff);
}

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