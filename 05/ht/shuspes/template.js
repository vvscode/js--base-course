var Template = function(tpl) {
    this.templateString = tpl;
};

Template.prototype.replaceByTag = function(string, tagName, value) {
    tagName = tagName || "";
    value = value || "";
    return (string || "").replace(new RegExp("{{" + tagName + "}}", "g"), value);
};

Template.prototype.createStringFromTemplate = function(data) {
    var result = this.templateString;
    for(var key in data) {
        result = this.replaceByTag(result, key, data[key]);
    }
    return result;
};

var compileTemplate = function(tpl) {
    var template = new Template(tpl);
    return function(el, data) {
        var result = template.createStringFromTemplate(data);
        el.innerHTML = result;
    };
}