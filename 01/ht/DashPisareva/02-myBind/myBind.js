Function.prototype.myBind = function (obj, ...rest) {
return function () {
this.apply(obj, rest)
}
}
