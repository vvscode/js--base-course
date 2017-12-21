import {getMapStateFromHash} from '../utils/utils';

function Search(options, eventBus, requestService) {
    this.options = options;
    this.container = document.getElementById(options.container);
    this.eventBus = eventBus;
    this.requestService = requestService;
    this.render();
    this.init();
}

Search.prototype.render = function () {
    var content = '<form><input type="text" name="address"><input type="submit" value="Найти">'
    content += '<input type="radio" name="requestType" value="xhr" checked> xhr';
    content += '<input type="radio" name="requestType" value="fetch"> fetch</form>';
    this.container.innerHTML = content;
}

Search.prototype.init = function () {
    var form = this.container.getElementsByTagName('form')[0];
    form.addEventListener('change', (ev) => {
        if (!ev.target.matches('input[type=radio]')) {
            return;
        }

        this.requestService.options.requestType = form.requestType.value;
    });

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        return this.requestService.getObjectLocationByAddress(form.address.value)
            .then((data) => this.eventBus.trigger('search:objectLocationLoaded', data));
    });
}

export default Search;