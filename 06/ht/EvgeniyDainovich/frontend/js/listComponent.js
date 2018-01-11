function ListComponent(allowRemove, maxItems, storageName, htmlElement) {
    this.maxItems = maxItems || 100;
    this.allowRemove = allowRemove;
    this.storageName = storageName;
    this.htmlElement = htmlElement;
    this.init();
    this.draw();
};

ListComponent.prototype.init = function () {
    var obj = localStorage.getItem(this.storageName);
    this.elements = JSON.parse(obj) || [];
};

ListComponent.prototype.findElement = function (cityName) {
    for (var i = 0; i < this.elements.length; i++) {
        if (cityName === this.elements[i].name) {
            return [this.elements[i].lat, this.elements[i].lng];
        }
    }
};
ListComponent.prototype.draw = function () {

    var input = "";
    for (let i = 0; i < this.elements.length; i++) {
        input += "<li><a href='#'>" + this.elements[i].name + "</a></li>";
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
    localStorage.setItem(this.storageName, JSON.stringify(this.elements))
};

ListComponent.prototype.addRemoval = function () {

};
ListComponent.prototype.removeElement = function () {

};
export default ListComponent;