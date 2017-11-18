var list = Symbol('list');

function List(options, eventBus, storage) {
    this.options = options;
    this.eventBus = eventBus;
    this.storage = storage;
    this.container = document.getElementById(this.options.container);
    this.init();
}

List.prototype.init = function() {
    this.storage.getData(this.options.container)
        .then((data) => this[list] = data || [])
        .then(() => this.render())
        .then(() => this.subscribeToClick());

    if (this.options.eventNameForAddElement) {
        this.addElementByEvent(this.options.eventNameForAddElement);
    }
}

List.prototype.render = function () {
    var content = `<ul><div>${this.options.label || ''}</div>`;
    var deleteBtn = this.options.allowDeleteElements ? '<input type="button" value="x">' : '';
    this[list].forEach((element, i) =>
        content += `<li data-index=${i}><span>${element.address}</span>${deleteBtn}</li>`);
    content += '</ul>';

    this.container.innerHTML = content;
}

List.prototype.addElement = function (element) {
    this[list].unshift(element);
    this.options.capacity && this.options.capacity < this[list].length && this[list].pop();
    this.storage.setData(this.options.container, this[list]);
    this.render();
}

List.prototype.deleteElement = function (htmlElement) {
    var index = +htmlElement.getAttribute('data-index');
    this[list].splice(index, 1);
    this.storage.setData(this.options.container, this[list]);
    this.render();
}

List.prototype.addElementByEvent = function (eventName) {
    this.eventBus.on(eventName, (data) => this.addElement(data));
}

List.prototype.subscribeToClick = function() {
    this.container.addEventListener('click', (ev) => {
        if (this.options.allowDeleteElements && ev.target.matches('input[type=button]')) {
            this.deleteElement(ev.target.parentNode);
        }

        if (event.target.matches('span')) {
            var index = +ev.target.parentNode.getAttribute('data-index');
            this.eventBus.trigger('list:elementClick', this[list][index]);
        }
    });
}

export default List;