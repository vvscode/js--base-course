class SearchComponent {
    constructor(htmlElement, eventBus) {
        this.htmlElement = htmlElement;
        this.eventBus = eventBus;
        this.init();
    };

    init() {
        this.render();
        this.htmlElement.addEventListener('keypress', (event) => {
            if (event.target.matches('input')) {
                if (event.keyCode == 13) {
                    this.goToCity();
                }
            }
        });
        this.htmlElement.addEventListener('click', (event) => {
            if (event.target.matches('button')) {
                this.goToCity();
            }
        });

    };
    goToCity() {
        if (this.input.value === '') {
            return;
        }
        this.eventBus.trigger('search:city', this.input.value);
        this.input.value = '';
    };
    render() {
        this.htmlElement.innerHTML = '';
        this.input = document.createElement('input');
        this.input.className = "form-control input__city";
        this.input.placeholder = 'city';
        this.htmlElement.appendChild(this.input);
        var span = document.createElement('span');
        span.className = 'input-group-btn';
        var btn = document.createElement('button');
        btn.className = 'btn btn-default search button__search_city';
        btn.type = 'button';
        var spanSearch = document.createElement('span');
        spanSearch.className = 'glyphicon glyphicon-search';
        btn.appendChild(spanSearch);
        span.appendChild(btn);
        this.htmlElement.appendChild(span);
    }

}



export default SearchComponent;