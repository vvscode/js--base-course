var o = { name: 'O-object' };
var f = function() {
    console.log(this.name);
};
Function.prototype.myBind = function() {
  var originalFunction = this;
  var bindArg = [].slice.call(arguments);
  var context = bindArg.shift();
  var unshiftArg = bindArg.concat([].slice.call(arguments));
    return function() {
        return originalFunction.apply(context, unshiftArg);
    };
};
var of = f.myBind(o);
of();