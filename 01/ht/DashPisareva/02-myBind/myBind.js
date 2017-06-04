Function.prototype.myBind = function (obj, ...rest) {
  var that = this
  return function () {
    that.apply(obj, rest)
  }
}
