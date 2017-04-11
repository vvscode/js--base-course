/**
 * Creates a new function that, when called, 
 * has its this keyword set to the provided value.
 */
Function.prototype.myBind = function(scope) {
    var func = this;
    return function() {
        return func.apply(scope);
    };
}