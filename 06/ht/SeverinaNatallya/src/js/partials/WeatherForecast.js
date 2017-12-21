(function () {
    var WeatherForecast = function (htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.eventBus.on("weatherMap:changeForecast", text => this.render(text));
    };
    WeatherForecast.prototype.render = function (text) {
        this.htmlEl.innerHTML = text;
    };
    window.WeatherForecast = WeatherForecast;
})();
