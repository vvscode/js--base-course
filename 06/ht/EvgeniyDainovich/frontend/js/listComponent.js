function ListComponent(allowRemove, maxItems, storageName, addRemoval, htmlElement, eventBus) {
    this.maxItems = maxItems || 100;
    this.allowRemove = allowRemove;
    this.storageName = storageName;
    this.addRemoval = addRemoval;
    this.htmlElement = htmlElement;
    this.eventBus = eventBus;
    this.init();
    this.redraw();
};

ListComponent.prototype.init = function () {
    var obj = localStorage.getItem(this.storageName);
    this.elements = JSON.parse(obj) || [];
    if (this.eventBus) {
        this.eventBus.on('map:clicked', (cityname, lat, lng) => {
            this.addElement({ name: cityname, lat: +lat, lng: +lng });
            this.redraw();
        });
    }
};

ListComponent.prototype.findElement = function (cityName) {
    for (var i = 0; i < this.elements.length; i++) {
        if (cityName === this.elements[i].name) {
            return { lat: this.elements[i].lat, lng: this.elements[i].lng, name: cityName };
        }
    }
};
ListComponent.prototype.redraw = function () {
    var input = "";
    for (let i = 0; i < this.elements.length; i++) {
        input += "<li><a href='#'>" + this.elements[i].name + "</a>" + (this.addRemoval ? "<a href='#' class='remove'>[x]</a>" : '') + "</li>";
    }
    this.htmlElement.innerHTML = input;

};
ListComponent.prototype.addElement = function (element) {
    if (this.elements.length < this.maxItems) {
        this.elements.splice(this.elements.length, 0, element);
    }
    else {
        this.elements.unshift(element);
        this.elements.pop(element);
    }
    localStorage.setItem(this.storageName, JSON.stringify(this.elements));
};


ListComponent.prototype.removeElement = function (cityName) {
    for (var i = 0; i < this.elements.length; i++) {
        if (cityName === this.elements[i].name) {
            this.elements.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(this.storageName, JSON.stringify(this.elements));
};
export default ListComponent;