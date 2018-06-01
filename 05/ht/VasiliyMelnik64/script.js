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

        arrayWithTemplates.forEach((item, i) => {
            tpl = tpl.includes(item) ? tpl.replace(item, data[arrayWithNames[i]]) : null;
        });
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
        if (!this.handlers[eventName].includes(cb)) {
            this.handlers[eventName].push(cb);
        }
    },
    off(eventName) {
        var data = [].slice.call(arguments, 1);
        data.forEach(elem => {
            this.handlers[eventName] = this.handlers[eventName].filter(el => el != elem);
        });
    },
    trigger: function (eventName) {
        for (var prop in this.handlers) {
            if (eventName === prop) {
                var data = [].slice.call(arguments, 1);
                this.handlers[prop].forEach(elem => elem.apply(null, data));
            }
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
 * @param  {array} params
 */

function Router(params) {
    this.routes = params || [];
    this.leavingBuffer;
    this.enteringBuffer;
    this.init();
}
Router.prototype = {
    init: function () {
        var self = this;
        window.addEventListener('hashchange', function () {
            self.handleUrl(location.hash.slice(1));
        });
        this.handleUrl(location.hash.slice(1));
    },
    handleUrl: function (hash) {
        this.routes.forEach(elem => {
            var template = elem.match;
            if ((typeof template == 'string' && hash == template) ||
                (template instanceof RegExp && template.test(hash)) ||
                (typeof (template) == "function" && template(hash))) {
                this.runHandlers(this, elem);
            }
        });
    },
    runHandlers: function (context, elem) {
        if (context.leavingBuffer) {
            Promise.resolve().then(context.leavingBuffer());
        }
        Promise.resolve()
            .then(elem.onBeforeEnter())
            .then(elem.onEnter())
            .then(_ => context.leavingBuffer = elem.onLeave);
    }
};