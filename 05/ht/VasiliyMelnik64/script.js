/**
 * Шаблонизатор
 * Должен иметь следующую сигнатуру:
 * compileTemplate = (tpl) => (el, data)
 * Компиляция шаблона возвращает функцию
 * при передаче этой функции элемента и объекта с данными
 * элемент получает разметку в соответсвии с tpl из data
 * var tpl = "{{name}} is {{age}} years old";
 * var el = document.createElement('div');
 * var template = compileTemplate(tpl);
 * template(el, { name: 'Bob', age: 33 });
 * el.innerHTML; // 'Bob is 33 years old
 * 
 * @param  {string} tpl
 * 
 * @return {function}
 * @param  {HTMLDivElement} el
 * @param  {object} data
 */
var compileTemplate = (tpl) => {
    var regExp = /{{(.+?)}}/g;
    return (el, data) => {
        var arrayWithTemplates = tpl.match(regExp) || [];
        var arrayWithNames = arrayWithTemplates.map(item => item.slice(2, -2));
        tpl.replace(regExp, (item, i, str) => tpl = data[arrayWithNames[i]]);
        return el.innerHTML = tpl;
    }
}

/**
 * EventBus  
 * @interface IEventBus {
 *   on(eventName, cb)
 *   off(eventName[, cb])
 *   trigger(eventName[, data1 [, data2 [...data]]])
 *   once(eventName, cb)
 * }
 */
function EventBus() {
    this.handlers = {};
}
EventBus.prototype = {
    on(eventName, cb) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        this.handlers[eventName].push(cb);
    },
    off(eventName) {
        var data = [].slice.call(arguments, 1);
        data.forEach(elem => {
            this.handlers[eventName] = this.handlers[eventName].filter(el => el != elem);
        });
    },
    trigger: function (eventName) {
        var data = [].slice.call(arguments, 1);
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(elem => elem.apply(null, data));
        }
    },
    once: function (eventName, cb) {
        var self = this;
        self.on(eventName, function temp() {
            cb.apply(self, arguments);
            self.off(eventName, temp);
        });
    }
};


/**
 * Написать Router, поддерживающий описание роутов в формате:
 * @interface IRoute {
 *    [name]: String optional
 *    [match]: String | RegExp | function
 *    onEnter([data]) | optional async function
 *    onLeave([data]) | optional async function
 *    onBeforeEnter([data]) | optional async function
 *  }
 * 
 * @constructor Router
 * @param  {object} params
 */
function Router(options) {
    options = options || {};
    this.routes = options.routes || [];
    this.init();
}

Router.prototype = {
    init() {
        this.handleUrl(this.getHash());
        window.addEventListener('hashchange', () => {
            this.handleUrl(this.getHash());
        });
    },
    handleUrl(url) {
        var result = Router.findRoute(this.routes, url);
        var route = result[0];
        var params = result[1];

        Promise.resolve()
            .then(() => {
                if (this.prevRoute && this.prevRoute.onLeave) {
                    return this.prevRoute.onLeave.call(this.prevRoute, this.prevParams);
                }
            })
            .then(() => {
                if (route.onBeforeEnter) {
                    return route.onBeforeEnter.call(route, params);
                }
            })
            .then(() => {
                this.prevRoute = route;
                this.prevParams = params;
                if (route.onEnter) {
                    return route.onEnter.call(route, params);
                }
            });

    },
    getHash() {
        return decodeURI(window.location.hash).slice(1);
    }
}

Router.findRoute = (routeList, url) => {
    var result = [null, null];
    routeList.forEach(function (route) {
        if (route.match === url) {
            result = [route, url];
        } else if (route.match instanceof RegExp && route.match.test(url)) {
            result = [route, url.match(route.match)];
        } else if (typeof route.match === 'function' && route.match(url)) {
            result = [route, route.match(url)];
        }
    });
    return result;
}