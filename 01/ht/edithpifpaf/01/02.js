var o = { name: 'O-object' };
var f = function() {
    console.log(this.name);
};
var myBind = function(context) {
  var originalFunction = this;
  return function() {
    originalFunction.apply(context);
  };
};
f.myBind = myBind;
var of = f.myBind(o);
of(); //