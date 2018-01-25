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

export default EventBus;