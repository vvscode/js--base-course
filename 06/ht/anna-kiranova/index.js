'use strict';

function hideAll() {
    let content = document.getElementById('content');
    let footer = document.getElementById('footer');
    footer.style.display = 'none';
    let nodes = content.querySelectorAll('#content > div');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.display = 'none';
    }
}

const bus = new EventBus();

let myMap;
let lastCity;

ymaps.ready(function() {
    new Router({
        routes: [
            {
                name: 'weather',
                match: ''
            },
            {
                name: 'weather',
                match: 'weather'
            },
            {
                name: 'weather',
                match: /weather\/(.+)/
            },
            {
                name: 'about',
                match: 'about'
            },
            {
                name: 'author',
                match: 'author'
            }
        ],
        eventBus: bus
    });
});

// citySearch on enter
document.getElementById('city').addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('citySearch').click();
    }
});

// citySearch on button click
function citySearch() {
    let city = document.getElementById('city').value.trim();
    document.getElementById('city').value = '';
    if (!city) {
        return false;
    }
    window.location.hash = '#weather/' + city;
    return false;
}

function debounce(fun, delay) {
    let timer = null;
    return function(...args) {
        let t = this;
        function onComplete() {
            fun.apply(t, args);
            timer = null;
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(onComplete, delay);
    };
}
