/**
 * Creates a new function that, when called, 
 * has its this keyword set to the provided value.
 */
Function.prototype.myBind = function() {
    var func = this;
    var args = [].slice.call(arguments);
    var scope = args.shift();
    return function() {
        return func.apply(scope, args.concat([].slice.call(arguments)));
    };
};
