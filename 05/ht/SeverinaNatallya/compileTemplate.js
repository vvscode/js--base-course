function compileTemplate(tp1) {
    var reg = /{{(\w+)}}/g;
    var tp = tp1;
    return function (el, data) {
        let match;
        while ((match = reg.exec(tp1)) !== null) {
            tp = tp.replace(match[0], data[match[1]] || null);
        }
        el.innerHTML = tp;
    };
}
