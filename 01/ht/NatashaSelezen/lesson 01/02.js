var o = { name: 'O-object' }; 
var f = function() { 
	console.log(this.name); 
}; 
Function.prototype.myBind = function(ctx) { 
	var Args = Array.prototype.slice.call(arguments, 1) 
	var cntx = this; 
	return function() { 
		cntx.apply(ctx, Args.concat(Array.prototype.slice.call(arguments)));
	}; 
}; 
var of = f.myBind(o); 
of();
   
