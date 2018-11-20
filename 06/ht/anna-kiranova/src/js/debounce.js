'use strict';

export default function debounce(fun, delay) {
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
