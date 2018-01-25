//шаблонизатор
function compileTemplate(tpl) {
    return function (el, data) {
        var retString = tpl;
        for (key in data) {
            retString = retString.replace(new RegExp(`{{${key}}}`, "g"), data[key])
        }
        el.innerHTML = retString;
    }
}

