var o = { name: 'O-object' };
 var f = function() {
 	console.log(this.name);
 };
 Function.prototype.myBind = function() {
   var fun = this;
   var args = Array.prototype.slice.call(arguments);
     return function() {
        return fun.apply(context,BindArgs.contact(fnArgs));
      };
 };
var of = f.myBind(o);
of();
   