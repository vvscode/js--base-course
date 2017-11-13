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
    var content = '<form><input type="text" name="address"><input type="button" value="Найти">'
    content += '<input type="radio" name="requestType" value="xhr" checked> xhr';
    content += '<input type="radio" name="requestType" value="fetch"> fetch</form>';
    this.container.innerHTML = content;
}

Search.prototype.init = function () {
    this.container.addEventListener('click', (event) => {
        if (!event.target.matches('input[type=button]')) {
            return;
        }

        this.requestService.getObjectLocationByAddress(document.forms[0].address.value)
            .then((data) => {
                var params = getMapStateFromHash(window.location.hash);
                params.center[0] = data.lat;
                params.center[1] = data.lng;

                this.eventBus.trigger('search:objectLocationLoaded', data);
            });
    });

    var form = this.container.getElementsByTagName('form')[0];
    form.addEventListener('change', (ev) => {
        if (!ev.target.matches('input[type=radio]')) {
            return;
        }

        this.requestService.options.requestType = form.requestType.value;
    });
}

export default Search;