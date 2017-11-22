var mapStateRegex = /#type=(\w+?)&center=(-?\d*[.]?\d+),(-?\d*[.]?\d+)&zoom=(\d{1,2})/;

function getMapStateFromHash() {
    var params = window.location.hash.match(mapStateRegex);

    return params && {
        mapType: params[1],
        center: [params[2], params[3]],
        zoom: params[4],
    }
}

function setHashByMapState(state) {
    window.location.hash = `type=${state.mapType}&center=${state.center}&zoom=${state.zoom}`;
}

function debounce(fun, delay) {
    var timer;
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);

        clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            fun.apply(null, args);
        }, delay);
    };
}

export {getMapStateFromHash, setHashByMapState, debounce};