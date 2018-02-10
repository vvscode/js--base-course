function debounce(func, delay) {
    var timerID;
    return function() {
        var self = this;
        var params = arguments;
        clearTimeout(timerID);
        timerID = setTimeout(function() {
            return func.apply(self, params);
        }, delay);
    }
}

export default debounce;