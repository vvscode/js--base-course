class WeatherForecast {
    constructor(htmlEl, eventBus) {
        this.htmlEl = htmlEl;
        this.eventBus = eventBus;
        this.eventBus.on("weatherMap:changeForecast", text => this.render(text));
    }
    render(text) {
        this.htmlEl.innerHTML = text;
    }
}
export default WeatherForecast;
