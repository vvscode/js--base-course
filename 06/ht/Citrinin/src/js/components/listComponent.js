import iStorage from "../utils/lsStorage";

class ListComponent {
    constructor(allowRemove, maxItemAmount, storageName, htmlElement, eventBus) {
        this.maxItemAmount = maxItemAmount || 0;
        this.allowRemove = allowRemove;
        this.items = {};
        this.storageName = storageName;
        this.htmlElement = htmlElement;
        this.eventBus = eventBus;
        this.init();
        if (this.storageName === 'Favorites') {
            this.addRemoval();
        }
    };

    init() {
        if (this.storageName === 'Favorites') {
            this.eventBus.on('google:cityFound', this.addItem.bind(this));
        }
        iStorage.getData(this.storageName)
            .then(result => {
                this.items = JSON.parse(result) || {};
                this.render();
            })

    }
    render() {
        this.htmlElement.innerHTML = '';
        let ul = document.createElement('ul');
        for (var key in this.items) {
            let li = document.createElement('li');
            let a = document.createElement('a');

            a.href = this.storageName === 'Favorites' ? `#center=${this.items[key].lat},${this.items[key].lng}` : `#city=${key}`;
            a.innerHTML = key + (this.allowRemove ? '<span class="glyphicon glyphicon-remove cross-align-right"/>' : '');
            li.appendChild(a);
            ul.insertBefore(li, ul.firstChild);

        };
        this.htmlElement.appendChild(ul);
    };
    addRemoval() {
        if (this.allowRemove) {
            this.htmlElement.addEventListener('click', (ev) => {
                if (ev.target.matches('.glyphicon-remove')) {
                    ev.preventDefault();
                    let key = ev.target.parentElement.innerText;
                    this.eventBus.trigger('list:removeFav', this.items[key]);
                    delete this.items[key];
                    iStorage.setData(this.storageName, JSON.stringify(this.items));
                    this.render();
                };
            });
        };
    };

    addItem(key, obj) {
        if (this.items[key] !== undefined) {
            return;
        }
        this.items[key] = obj || {};

        if (this.storageName === 'Favorites') {
            this.eventBus.trigger('list:addFav', this.items[key]);
        }
        if (this.maxItemAmount !== 0 && Object.keys(this.items).length > this.maxItemAmount) {
            delete this.items[Object.keys(this.items)[0]];
        }
        this.render();
        iStorage.setData(this.storageName, JSON.stringify(this.items));
    };

}

export default ListComponent;